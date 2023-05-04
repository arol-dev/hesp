import { Prisma, PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next"


const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = req.body
    const reult = await prisma.user.delete({
      where: {
        id: body.id
      }
    })
    res.status(200).json({ data: reult });
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  } finally {

  }
}
