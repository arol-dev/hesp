import { Prisma, PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next"


const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = req.body
    console.log('body', body)
    // const coach = await prisma.user.update({
    //   data: {
    //     firstName: body.firstName,
    //     lastName: body.lastName,
    //     email: body.email,
    //     picture: body.picture
    //   }
    // })
    // res.status(200).json({ data: body });
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Something went wrong' })
  } finally {

  }
}
