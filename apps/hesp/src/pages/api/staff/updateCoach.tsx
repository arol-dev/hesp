import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import uploadAvatarImage from "@/components/UploadAvatarImage";
import { updateToken } from "../auth/login";

const prisma = new PrismaClient();

const upload = multer({ storage: multer.memoryStorage() }).fields([
  { name: "id" },
  { name: "firstName" },
  { name: "lastName" },
  { name: "email" },
  { name: "picture" },
]);

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
    await new Promise<void>((resolve, reject) =>
      (upload as any)(req, res, (err: any) => (err ? reject(err) : resolve()))
    );

    // req.body now contains the non-file fields in the form.
    const { id, firstName, lastName, email } = req.body;

    let picture;
    if (req.files && req.files.picture && req.files.picture.length > 0) {
      const file = req.files.picture[0];

      const pictureUrl = await uploadAvatarImage(file, id); // Call the uploadAvatarImage function

      picture = pictureUrl ?? null;
    }
    const coach = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        firstName,
        lastName,
        email,
        picture: picture,
      },
    });
    updateToken(coach, res);

    res.status(200).json({ data: coach });
  } catch (error) {
    console.error("Error updating coach", error);
    res.status(500).json({
      error: (error as Error).message,
    });
  }
}
