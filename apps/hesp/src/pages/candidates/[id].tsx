import Candidate from "@/components/Candidate";
import { GetServerSideProps } from "next";
import serverToDb from "../../../lib/helperFuntions/serverToDb";
import dateToISOString from "../../../lib/helperFuntions/dataToIsoString";
export function Profile({ person, WOLs, PDs }: any) {
  return <Candidate WOLs={WOLs} person={person} pds={PDs}></Candidate>;
}
export default Candidate;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: any = context.query;
  const person = await serverToDb("Trainee", "get", undefined, id);

  const WOLs = await serverToDb("WOL", "get", undefined, id);

  const PDs = await serverToDb("PDC", "get", undefined, id);

  console.log(person);
  return {
    props: {
      person: dateToISOString(person),
      WOLs: dateToISOString(WOLs),
      PDs: dateToISOString(PDs),
    },
  };
};
