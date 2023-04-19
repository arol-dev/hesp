import Navbar from "@/components/Navbar";
import List from "@/components/List";
import { GetServerSideProps } from "next";

interface people {
  id: string;
  name: string;
  title: string;
  email: string;
  role: string;
  checkpoint: string;
  status: string;
}

function Main({ people }: any) {
  return (
    <div>
      <Navbar></Navbar>
      <List people={people}></List>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const response = fetch..
  const people = [
    {
      id: "1",
      name: "Lindsay Walton",
      title: "Front-end Developer",
      email: "lindsay.walton@example.com",
      role: "Member",
      checkpoint: "5 days ago",
      status: "active",
    },
    {
      id: "2",
      name: "Mandy Walton",
      title: "Front-end Developer",
      email: "mandy.walton@example.com",
      role: "Member",
      checkpoint: "5 days ago",
      status: "active",
    },
  ];
  return {
    props: {
      people,
    },
  };
};

export default Main;
