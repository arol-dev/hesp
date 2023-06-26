import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import uploadAvatarImage from "@/components/UploadAvatarImage";

const prisma = new PrismaClient();

const upload = multer({ storage: multer.memoryStorage() }).fields([
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
    const id = req.query.id as string;

    let picture;
    if (req.files && req.files.picture && req.files.picture.length > 0) {
      const file = req.files.picture[0];

      const pictureUrl = await uploadAvatarImage(file, `trainee/${id}`);

      picture = pictureUrl ?? null;
    }
    const trainee = await prisma.trainee.update({
      where: { id: parseInt(id) },
      data: {
        picture: picture,
      },
    });

    res.status(200).json({ data: trainee });
  } catch (error) {
    console.error("Error updating coach", error);
    res.status(500).json({
      error: (error as Error).message,
    });
  }
}
