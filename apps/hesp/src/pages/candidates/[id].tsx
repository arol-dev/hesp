import Candidate from "@/components/Candidate";
import { GetServerSideProps } from "next";

export function Profile({ person }: any) {
  return <Candidate person={person}></Candidate>;
}
export default Candidate;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: any = context.query;
  const domainName = context.req.headers.host;
  const person = await fetch(`http://${domainName}/api/he/${id}`).then((res) =>
    res.json()
  );

  return {
    props: {
      person,
    },
  };
};
