import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = req.body
    const checkpoint = await prisma.pDCcheckpoint.create({
      data: {
        trust: parseInt(body.trust),
        willFollow: parseInt(body.willFollow),
        retention: parseInt(body.retention),
        commitment: parseInt(body.commitment),
        cv: parseInt(body.cv),
        readyForInterviews: parseInt(body.readyForInterviews),
        advancement: parseInt(body.advancement),
      },
    })
    res.status(200).json({ data: checkpoint })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  } finally {
    await prisma.$disconnect()
  }
}
