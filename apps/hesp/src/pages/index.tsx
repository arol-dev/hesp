import Navbar from "@/components/Navbar";
import List from "@/components/List";
import { GetServerSideProps } from "next";
import serverToDb from "../../lib/helperFuntions/serverToDb";

function Main({ people }: any) {
  return (
    <div>
      <Navbar></Navbar>

      <List people={people}></List>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const people = await serverToDb("Trainee", "get", undefined);

  return {
    props: {
      people,
    },
  };
};

export default Main;
