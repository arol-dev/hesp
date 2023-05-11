import Navbar from "@/components/Navbar"
import Teampage from "@/components/Team/Teampage"
import { GetServerSideProps } from "next";
import { IUser } from "../../types";

interface ITeamProps {
  coaches: IUser[]
}

function Team({ coaches }: ITeamProps) {

  return (<>
    <Teampage coaches={coaches}></Teampage>
  </>
  )
}
export default Team


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: any = context.query
  const domainName = context.req.headers.host;
  const coaches = await fetch(`http://${domainName}/api/staff/staff`).then((res) =>
    res.json()
  );


  return {
    props: {
      coaches
    },
  };
};