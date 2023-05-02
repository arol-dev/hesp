import { Prisma, PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next"

interface UpdatePDCcheckpointInput extends Prisma.PDCcheckpointUpdateInput {
  SessionNotes?: {
    create: Array<{
      id: number;
      topic: string;
      objective: string;
      actions: string;
      notes: string;
      results: string;
      evaluation: string
    }>
  };
}

type TopicProps = {
  id: number,
  edit: boolean,
  topic: string,
  objective: string,
  actions: string,
  notes: string,
  results: string,
  evaluation: string;

}

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const body = req.body





  try {
    const topicsList = JSON.parse(body.topicsList)
    const checkpoint = await prisma.pDCcheckpoint.create({
      data: {
        traineeId: parseInt(body.userId),
        trust: parseInt(body.trust),
        willFollow: parseInt(body.willFollow),
        retention: parseInt(body.retention),
        commitment: parseInt(body.commitment),
        cv: parseInt(body.cv),
        readyForInterviews: parseInt(body.readyForInterviews),
        advancement: parseInt(body.advancement),
      }
    });

    const updatedCheckpoit = await prisma.pDCcheckpoint.update({
      where: { id: checkpoint.id },
      data: {
        SessionNotes: {
          create: topicsList.map((topic: TopicProps) => ({
            id: topic.id,
            topic: topic.topic,
            objective: topic.objective,
            actions: topic.actions,
            notes: topic.notes,
            results: topic.results,
            evaluation: topic.evaluation
          }))
        }
      } as UpdatePDCcheckpointInput
    })
    res.status(200).json({ data: updatedCheckpoit });
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  } finally {
    await prisma.$disconnect()
  }
}
