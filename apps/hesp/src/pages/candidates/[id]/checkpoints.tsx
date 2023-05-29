import Checkpoints from "@/components/Checkpoints/AllCheckpoints";
import { GetServerSideProps } from "next";
import { authenticateAndGetToken } from "../../../../lib/auth/authUtils";
import { PrismaClient } from "@prisma/client";
import dateToISOString from "../../../../lib/helperFuntions/dataToIsoString";

const prisma = new PrismaClient();
function AllCheckpoints({ id, WOLs, PDs, person }: any) {
  return <Checkpoints id={id} WOLs={WOLs} PDs={PDs} person={person}></Checkpoints>;
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

    const person = await prisma.trainee.findUnique({
      where: {
        id: parsedId
      }
    })

    const WOLs = await prisma.wOLcheckpoint.findMany({
      where: {
        traineeId: parsedId,
      },
    });

    const PDs = await prisma.pDCcheckpoint.findMany({
      where: {
        traineeId: parsedId,
      },
      include:
        { SessionNotes: true }
    });

    return {
      props: {
        id: parsedId,
        WOLs: dateToISOString(WOLs),
        PDs: dateToISOString(PDs),
        person
 
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
