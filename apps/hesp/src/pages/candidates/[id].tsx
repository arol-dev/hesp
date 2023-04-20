import Candidate from "@/components/Candidate";
import { GetServerSideProps } from "next";
import serverToDb from "../../../lib/serverToDb";

export function Profile({ person }: any) {
  return <Candidate person={person}></Candidate>;
}
export default Candidate;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: any = context.query;
  console.log("this is the id", id);
  const person = await fetch(`http://localhost:3000/api/he/${id}`).then((res) =>
    res.json()
  );

  return {
    props: {
      person,
    },
  };
};
