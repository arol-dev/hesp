import Candidate from "@/components/Candidate";
import { GetServerSideProps } from "next";

export function Profile({ person, WOLs, PDs }: any) {

  const updatePerson = (updatedPersonData: any) => {
    
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
  
    return <Candidate
      WOLs={WOLs}
      person={person}
      pds={PDs}
      updatePerson={updatePerson}
    ></Candidate>
    
    
  }
}
  export default Candidate;

  export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id }: any = context.query
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
  }

