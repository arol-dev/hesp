import { Prisma, PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next"
import { SessionNote } from '../../../../types'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const body = req.body

  try {
    const sessionNotes = JSON.parse(body.sessionNotes)
    const checkpoint = await prisma.pDCcheckpoint.create({
      data: {
        trust: parseInt(body.trust),
        willFollow: parseInt(body.willFollow),
        retention: parseInt(body.retention),
        commitment: parseInt(body.commitment),
        cv: parseInt(body.cv),
        readyForInterviews: parseInt(body.readyForInterviews),
        advancement: parseInt(body.advancement),
        traineeId: parseInt(body.userId),
      }
    });
    const updatedCheckpoit = await prisma.pDCcheckpoint.update({
      where: { id: checkpoint.id },
      data: {
        SessionNotes: {
          create: sessionNotes.map((note: SessionNote) => ({
            topic: note.topic,
            objective: note.objective,
            actions: note.actions,
            notes: note.notes,
            results: note.results,
            evaluation: note.evaluation,
          }))
        }
      }
    })
    res.status(200).json({ data: updatedCheckpoit });
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  } finally {
    await prisma.$disconnect()
  }
}
