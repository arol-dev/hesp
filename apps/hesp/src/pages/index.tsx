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
  const people = await serverToDb("Trainee", "get", undefined);

  return {
    props: {
      people,
    },
  };
};

export default Main;
