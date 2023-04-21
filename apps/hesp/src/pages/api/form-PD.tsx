import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get data submitted in request's body.
  const body = req.body

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log('body from api: ', body)

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: 'First or last name not found' })
  }



  // Found the name.
  // Sends a HTTP success code
  res.status(200).json({ trust: body.trust })
}