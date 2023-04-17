import Dashboard from "@/components/Dashboard";
import List from "@/components/List";
import { GetServerSideProps } from "next";

function Main({ people }) {
  return (
    <div>
      <Dashboard></Dashboard>
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
