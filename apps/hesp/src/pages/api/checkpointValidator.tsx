// import { PrismaClient } from "@prisma/client"
// import { NextApiRequest, NextApiResponse } from "next"


// const prisma = new PrismaClient()
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {

//   const body = req.body

//   const oneMonthAgo = new Date()
//   oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

//   const allPDs = await prisma.pDCcheckpoint.findMany({
//     where: {
//       traineeId: parseInt(body.userId)
//     }
//   })

//   const allWols = await prisma.wOLcheckpoint.findMany({
//     where: {
//       traineeId: parseInt(body.userId)
//     }
//   })

//   const lastPDCheckpoint = await prisma.pDCcheckpoint.findFirst({
//     where: {
//       traineeId: parseInt(body.userId),
//       createdAt: {
//         gte: oneMonthAgo
//       }
//     },
//     orderBy: {
//       createdAt: 'desc'
//     }
//   })


//   const lastWOLCheckpoint = await prisma.wOLcheckpoint.findFirst({
//     where: {
//       traineeId: parseInt(body.userId),
//       createdAt: {
//         gte: oneMonthAgo
//       }
//     },
//     orderBy: {
//       createdAt: 'desc'
//     }
//   })

//   // if ((allWols.length === 0 || !lastWOLCheckpoint) && (allPDs.length === 0 || !lastPDCheckpoint)) {
//   res.status(200).send('OK')
//   // }
//   // if ((allWols.length === 0 || !lastWOLCheckpoint) && (allPDs.length > 0 || lastPDCheckpoint)) {
//   //   res.status(200).send("Please create a WOL checkpoint")
//   // }
//   // if ((allWols.length > 0 || lastWOLCheckpoint) && (allPDs.length === 0 || !lastPDCheckpoint)) {
//   //   res.status(200).send("Please create a PD checkpoint")
//   // }
//   // else {
//   //   res.status(500).send('Error')
//   // }
// }




