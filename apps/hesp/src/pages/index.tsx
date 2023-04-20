import Navbar from "@/components/Navbar";
import List from "@/components/List";
import { GetServerSideProps } from "next";
function Main({ people }: any) {
  return (
    <div>
      <Navbar></Navbar>
      <List people={people}></List>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const people = await fetch(`http://localhost:3000/api/he/he`).then(
    (res) =>
      res.json() || [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          email: "test",
          phone: "1234567890",
          reference: "1234567890",
        },
        {
          id: 2,
          firstName: "John",
          lastName: "Doe",
          email: "test",
          phone: "1234567890",
          reference: "1234567890",
        },
      ]
  );

  return {
    props: {
      people,
    },
  };
};

export default Main;
