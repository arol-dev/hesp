import Candidate from "@/components/Candidate";
import { GetServerSideProps } from "next";
import type { NextApiRequest, NextApiResponse } from "next";
import serverToDb from "../../../lib/helperFuntions/serverToDb";

//client component
function Profile({ person, WOLs, PDs  }: any) {

  const updatePerson = ( updatedPersonData: any) => {
    // handle the update logic here or call a function to update the data on the server
    // use fetch to call the controller api/he/id?
    
    fetch(`http://localhost:3000/api/he/${updatedPersonData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPersonData),
    })
    .then((res) => res.json())
    .then((data) => {
   
    });
  };
  return (
    <>
      <Candidate  WOLs={WOLs} person={person} pds={PDs} updatePerson={updatePerson} />
    </>
  )
}
export default Profile;

const parseId = (id: string | string[] | undefined): number | null => {
  if (typeof id !== "string") return null;
  const parsedId = parseInt(id);
  return isNaN(parsedId) ? null : parsedId;
};


export const getServerSideProps: GetServerSideProps = async (context) => {

  const { id }: any = context.query
  const domainName = context.req.headers.host;

  const parsedId = parseId(id);

  if (parsedId === null) {
    return {
      notFound: true,
    };
  }

  const person = await serverToDb('Trainee', 'get', { query: { id: parsedId }, body: {} });
 

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