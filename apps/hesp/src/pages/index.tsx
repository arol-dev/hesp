import { authenticateAndGetToken } from "../../lib/auth/authUtils";
import List from "@/components/MainPage";
import { props } from "cypress/types/bluebird";
import { ITrainee, IUser } from "../../types";
import dateToISOString from "../../lib/helperFuntions/dataToIsoString";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { AuthContext } from "../../types";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

interface props {
  user: IUser[];
  jwt: IUser;
  Trainees: ITrainee[];
}

const Main: React.FC<props> = ({ user, jwt, Trainees }) => {
  return (
    <div className="h-screen">
      <List user={user} jwt={jwt} Trainees={Trainees}></List>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<props> = async (
  context: GetServerSidePropsContext
) => {
  try {
    const decodedToken = await authenticateAndGetToken(context as AuthContext);
    const cookies = context.req.headers.cookie;

    if (!cookies) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const HEs = await prisma.trainee.findMany();

    const user = await prisma.user.findMany({
      include: {
        Trainee: true,
      },
    });

    return {
      props: {
        user: dateToISOString(user),
        jwt: decodedToken,
        Trainees: dateToISOString(HEs),
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

export default Main;
