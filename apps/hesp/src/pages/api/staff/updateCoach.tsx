import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import supabase from "../../../../lib/helperFuntions/supabaseClient";
import fs from "fs";

const prisma = new PrismaClient();

const upload = multer({ storage: multer.memoryStorage() });

interface NextApiRequestWithFiles extends NextApiRequest {
  files: Express.Multer.File[];
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequestWithFiles,
  res: NextApiResponse
) {
  try {
    // We'll do our form data parsing here. Multer will attach the files to req.files.
    await new Promise<void>((resolve, reject) =>
      upload.any()(req as any, res as any, (err: any) =>
        err ? reject(err) : resolve()
      )
    );

    // req.body now contains the non-file fields in the form.
    const { id, firstName, lastName, email } = req.body;

    let picture;

    // If a file has been uploaded, we upload it to Supabase and get the URL.
    if (req.files && req.files.length > 0) {
      const file = req.files[0];

      const { data, error } = await supabase.storage
        .from("avatar images")
        .upload(file.originalname, file.buffer);

      if (error) {
        throw error;
      }

      // The URL of the uploaded file in Supabase Storage. You might need to adjust this according to your bucket settings and file path.
      picture = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${file.originalname}`;
    }

    const coach = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        firstName,
        lastName,
        email,
        picture,
      },
    });

    res.status(200).json({ data: coach });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: (error as Error).message,
    });
  }
}
