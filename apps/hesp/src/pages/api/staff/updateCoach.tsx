import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import supabase from "../../../../lib/helperFuntions/supabaseClient";
import fs from "fs";
import uploadAvatarImage from "@/components/UploadAvatarImage";

const prisma = new PrismaClient();

const upload = multer({ storage: multer.memoryStorage() }).fields([
  { name: "id" },
  { name: "firstName" },
  { name: "lastName" },
  { name: "email" },
  { name: "picture" },
]);

console.log("Upload fields:", Object.keys(upload).toString());

interface NextApiRequestWithFiles extends NextApiRequest {
  files: {
    picture: Express.Multer.File[];
  };
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
    console.log("Handling request");
    // We'll do our form data parsing here. Multer will attach the files to req.files.
    await new Promise<void>((resolve, reject) =>
      (upload as any)(req, res, (err: any) => (err ? reject(err) : resolve()))
    );

    // req.body now contains the non-file fields in the form.
    const { id, firstName, lastName, email } = req.body;

    let picture;

    console.log("Files:", req.files);

    // If a file has been uploaded, we upload it to Supabase and get the URL.
    if (req.files && req.files.picture && req.files.picture.length > 0) {
      const file: any = req.files.picture[0];

      console.log("Calling uploadAvatarImage"); // Add this line

      console.log("File object:", file);

      const publicUrl = await uploadAvatarImage(file, id); // Call the uploadAvatarImage function

      picture = publicUrl?.toString() ?? null;
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
