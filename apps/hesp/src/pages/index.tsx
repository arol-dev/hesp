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
  const people = await fetch(`http://localhost:3000/api/he/he`).then((res) =>
    res.json()
  );

  return {
    props: {
      people,
    },
  };
};

export default Main;
