import { Prisma, PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next"


const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = req.body


    const wolCheckpoint = await prisma.wOLcheckpoint.create({
      data: {
        traineeId: Number(body.userId),
        health: Number(body.health),
        healthFeel: body.healthFeel,
        healthImprove: body.healthImprove,
        work: Number(body.career),
        workFeel: body.careerFeel,
        workImprove: body.careerImprove,
        finances: Number(body.finances),
        financesthFeel: body.financesFeel,
        financesthImprove: body.financesImprove,
        environment: Number(body.environment),
        environmentFeel: body.environmentFeel,
        environmentImprove: body.environmentImprove,
        love: Number(body.love),
        loveFeel: body.loveFeel,
        loveImprove: body.loveImprove,
        familyFriends: Number(body.familyfriends),
        familyFriendsFeel: body.familyfriendsFeel,
        familyFriendsImprove: body.familyfriendsImprove,
        personalDevelopment: Number(body.personaldevelopment),
        personalDevelopmentFeel: body.personaldevelopmentFeel,
        personalDevelopmentImprove: body.personaldevelopmentImprove,
        fun: Number(body.fun),
        funFeel: body.funFeel,
        funImprove: body.funImprove


      }
    })
    res.status(200).json({ data: wolCheckpoint });
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  } finally {

  }
}
