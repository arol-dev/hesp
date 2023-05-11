import Navbar from "@/components/Navbar";
import Teampage from "@/components/Team/Teampage";
import { GetServerSideProps } from "next";
import { IUser } from "../../types";
import serverToDb from "../../lib/helperFunctions/serverToDb";

interface ITeamProps {
  coaches: IUser[];
}

function Team({ coaches }: ITeamProps) {
  return (
    <>
      <Navbar headerText="Admin"></Navbar>
      <Teampage coaches={coaches}></Teampage>
    </>
  );
}
export default Team;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: any = context.query;
  const domainName = context.req.headers.host;
  const coaches = await serverToDb("User", "get");

  return {
    props: {
      coaches,
    },
  };
};
