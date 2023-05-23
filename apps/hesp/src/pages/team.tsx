import Teampage from "@/components/Team/Teampage";
import { GetServerSideProps } from "next";
import { authenticateAndGetToken } from "../../lib/auth/authUtils";
import serverToDb from "../../lib/helperFuntions/serverToDb";
import { IUser } from "../../types";

interface ITeamProps {
  coaches: IUser[];
  jwt: IUser;
}

function Team({ coaches, jwt }: ITeamProps) {
  return (
    <>
      <Teampage jwt={jwt} coaches={coaches}></Teampage>
    </>
  );
}
export default Team;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const coaches = await serverToDb("User", "get");

  const decodedToken = await authenticateAndGetToken(context);
  const cookies = context.req.headers.cookie;

  if (!decodedToken || !cookies) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const jwt = decodedToken;

  return {
    props: {
      coaches,
      jwt,
    },
  };
};
