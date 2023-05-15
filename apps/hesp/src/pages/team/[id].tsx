import CoachProfilePage from "@/components/Team/CoachProfilePage";
import Navbar from "@/components/Navbar";
import { GetServerSideProps } from "next";
import { IUser } from "../../../types";
import serverToDb from "../../../lib/helperFunctions/serverToDb";

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

export const getServerSideProps: GetServerSideProps = async () => {
  const person = await serverToDb("User", "get");

  return {
    props: {
      person,
    },
  };
};
