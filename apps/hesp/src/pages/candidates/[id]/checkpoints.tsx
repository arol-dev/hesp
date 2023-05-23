import Checkpoints from "@/components/Checkpoints/AllCheckpoints";
import { GetServerSideProps } from "next";
import { authenticateAndGetToken } from "../../../../lib/auth/authUtils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
function AllCheckpoints({ id, WOLs, PDs }: any) {
  return <Checkpoints id={id} WOLs={WOLs} PDs={PDs}></Checkpoints>;
}
export default AllCheckpoints;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    const decodedToken = await authenticateAndGetToken(context);
    const cookies = context.req.headers.cookie;

    if (!cookies || !decodedToken) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const { id } = context.query;
    const parsedId = parseInt(id as string);

    const WOLs = await prisma.wOLcheckpoint.findUnique({
      where: {
        id: parsedId,
      },
    });

    const PDs = await prisma.pDCcheckpoint.findUnique({
      where: {
        id: parsedId,
      },
    });

    return {
      props: {
        id: parsedId,
        WOLs,
        PDs,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
};
