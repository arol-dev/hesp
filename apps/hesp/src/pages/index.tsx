import Navbar from "@/components/Navbar";
import List from "@/components/List";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
function Main({ people }: any) {
  useEffect(() => {
    console.log("people", people);
    console.log("env", process.env.DATABASE_URL);
  }, []);
  return (
    <div>
      <Navbar></Navbar>

      <List people={people}></List>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const domainName = context.req.headers.host;
  const people = await fetch(`${protocol}://${domainName}/api/he/he`).then(
    (res) => res.json()
  );

  return {
    props: {
      people,
    },
  };
};

export default Main;
