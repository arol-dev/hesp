import Candidate from "@/components/CandidatePage/Candidate";
import { GetServerSideProps } from "next";
import { authenticateAndGetToken } from "../../../lib/auth/authUtils";
import {
  ITrainee,
  IUser,
  IWOLcheckpoint,
  IPDCcheckpoint,
} from "../../../types";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import dateToISOString from "../../../lib/helperFuntions/dataToIsoString";

interface IPageProps {
  person: ITrainee;
  jwt: Partial<IUser>;
  coach: IUser;
}

export function Profile({ person, jwt, coach }: IPageProps) {
  return <Candidate person={person} jwt={jwt} coach={coach}></Candidate>;
}
export default Candidate;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    const decodedToken = await authenticateAndGetToken(context);
    const cookies = context.req.headers.cookie;
    const { id }: any = context.query;

    if (!decodedToken || !cookies || !id) {
      throw new Error("Authentication failed.");
    }

    const person = await prisma.trainee.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        WOLcheckpoint: true,
        PDCcheckpoint: true,
      },
    });

    const coach = await prisma.user.findUnique({
      where: {
        id: person?.coachId ?? undefined,
      },
    });

    ///// why do we need this?
    const WOLs = await prisma.wOLcheckpoint.findMany();

    const PDs = await prisma.pDCcheckpoint.findMany();

    return {
      props: {
        person: dateToISOString(person),
        WOLs: dateToISOString(WOLs),
        PDs: dateToISOString(PDs),
        jwt: decodedToken,
        coach,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
