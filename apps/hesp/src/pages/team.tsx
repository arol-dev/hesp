import Navbar from "@/components/Navbar";
import Teampage from "@/components/Teampage";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from "next";
import { IUser } from "../../types";
import serverToDb from "../../lib/helperFuntions/serverToDb";
import { authenticateAndGetToken } from "../../lib/auth/authUtils";
import { ParsedUrlQuery } from "querystring";

interface ITeamProps {
  coaches: IUser[];
  jwt: IUser;
}

function Team({ coaches, jwt }: ITeamProps) {
  return (
    <>
      <Navbar headerText="Admin"></Navbar>
      <Teampage coaches={coaches} jwt={jwt}></Teampage>
    </>
  );
}
export default Team;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const decodedToken = await authenticateAndGetToken(context);

  const coaches = await serverToDb("User", "get");

  return {
    props: {
      coaches,
      jwt: decodedToken,
    },
  };
};
