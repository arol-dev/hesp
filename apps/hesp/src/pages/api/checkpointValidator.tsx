import { PrismaClient } from "@prisma/client"
import { last } from "cypress/types/lodash"
import { NextApiRequest, NextApiResponse } from "next"


const prisma = new PrismaClient()
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  console.log('im here')
  const body = req.body

  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

  const allWols = await prisma.pDCcheckpoint.findMany({
    where: {
      traineeId: parseInt(body.userId)
    }
  })

  const lastCheckpoint = await prisma.pDCcheckpoint.findFirst({
    where: {
      traineeId: parseInt(body.userId),
      createdAt: {
        gte: oneMonthAgo
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  console.log('last', lastCheckpoint)


  if (allWols.length === 0 || !lastCheckpoint) {
    res.status(200).send('OK')
  }
  else {
    res.status(500).send('Error')
  }
}




