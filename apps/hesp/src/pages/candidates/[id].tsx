import Candidate from "@/components/Candidate";
import { GetServerSideProps } from "next";

export function Profile({ person, WOLs, PDs }: any) {
  return <Candidate WOLs={WOLs} person={person} pds={PDs}></Candidate>;
}
export default Candidate;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: any = context.query;
  const domainName = context.req.headers.host;
  const person = await fetch(`http://${domainName}/api/he/${id}`).then((res) =>
    res.json()
  );




  const WOLs = await fetch(`http://${domainName}/api/wol/${id}`).then((res) =>
    res.json()
  );


  const PDs = await fetch(`http://${domainName}/api/pdc/${id}`).then((res) =>
    res.json()
  );










  return {
    props: {
      person,
      WOLs,
      PDs
    },
  };
};
