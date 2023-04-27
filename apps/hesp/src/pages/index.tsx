import Navbar from "@/components/Navbar";
import List from "@/components/List";
import { GetServerSideProps } from "next";
import serverToDb from "../../lib/helperFuntions/serverToDb";

function Main({ user }: any) {
  return (
    <div>
      <Navbar></Navbar>

      <List user={user}></List>
    </div>
  );
}

export async function getServerSideProps(context: {
  req: { headers: { host: string; cookie: string } };
}) {
  const host = context.req.headers.host;

  const user = await fetch(`http://${host}/api/auth/authenticate`, {
    method: "GET",
    headers: {
      cookie: context.req.headers.cookie,
    },
  }).then((res) => res.json());

  return {
    props: {
      user: user.user,
    },
  };
}

export default Main;
