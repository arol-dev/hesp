import { Prisma, PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next"


const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = req.body

    const coach = await prisma.user.update({
      where: { id: parseInt(body.id) },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
      }
    })
    res.status(200).json({ data: coach });
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  } finally {

  }
}
