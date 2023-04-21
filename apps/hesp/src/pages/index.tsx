import Navbar from "@/components/Navbar";
import List from "@/components/List";
import { GetServerSideProps } from "next";
import serverToDb from "../../lib/serverToDb";

function Main({ people }: any) {
  const database = process.env.NEXT_PUBLIC_DB_URL;

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
