import CoachProfilePage from "@/components/Team/CoachProfilePage";
import Navbar from "@/components/Navbar";
import { GetServerSideProps } from "next";
import { IUser } from "../../../types";
import { authenticateAndGetToken } from "../../../lib/auth/authUtils";

interface CoachPageProps {
  person: IUser;
}

function CoachPage({ person }: CoachPageProps) {
  return (
    <>
      <Navbar headerText="Profile"></Navbar>
      <CoachProfilePage person={person}></CoachProfilePage>
    </>
  );
}

export default CoachPage;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const decodedToken = await authenticateAndGetToken(context);
  const cookies = context.req.headers.cookie;
  const { id }: any = context.query;

  if (!cookies || !decodedToken || !id) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const person = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  return {
    props: {
      person,
    },
  };
};
