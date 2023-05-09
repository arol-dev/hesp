import CoachProfilePage from "@/components/Team/CoachProfilePage"
import Navbar from "@/components/Navbar"
import { GetServerSideProps } from "next";
import { IUser } from "../../../types";

interface CoachPageProps {
  person: IUser
}

function CoachPage({ person }: CoachPageProps) {

  return (
    <>
      <Navbar headerText="Profile"></Navbar>
      <CoachProfilePage person={person}></CoachProfilePage>
    </>
  )
}

export default CoachPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: any = context.query
  const domainName = context.req.headers.host;
  const person = await fetch(`http://${domainName}/api/staff/${id}`).then((res) =>
    res.json()
  );


  return {
    props: {
      person
    },
  };
};
