import CoachProfilePage from "@/components/Team/CoachProfilePage";
import Navbar from "@/components/Navbar";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { IUser } from "../../../types";
import { AuthContext } from "../../../types";
import { authenticateAndGetToken } from "../../../lib/auth/authUtils";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface CoachPageProps {
  person: IUser;
  jwt: IUser;
}

function CoachPage({ person, jwt }: CoachPageProps) {
  return (
    <>
      <Navbar headerText="Profile"></Navbar>
      <CoachProfilePage jwt={jwt} person={person}></CoachProfilePage>
    </>
  );
}

export default CoachPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const decodedToken = await authenticateAndGetToken(context as AuthContext);
  const cookies = context.req.headers.cookie;
  const { id } = context.query;

  if (!cookies || !decodedToken || !id) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  console.log(decodedToken);

  const person = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  return {
    props: {
      person,
      jwt: decodedToken,
    },
  };
};
