import { authenticateAndGetToken } from "../../lib/auth/authUtils";
import Navbar from "@/components/Navbar";
import List from "@/components/MainPage";

function Main({ user }: any) {
  return (
    <div>
      <Navbar headerText={"HESP Program"}></Navbar>
      <List user={user}></List>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const decodedToken = await authenticateAndGetToken(context);
  const cookies = context.req.headers.cookie;
  const host = context.req.headers.host;


  if (!cookies) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const user = await fetch(`http://${host}/api/auth/authenticate`, {
    method: "GET",
    headers: {
      cookie: context.req.headers.cookie,
    },
  }).then((res) => res.json());



  return {
    props: {
      user: user.user,
      jwt: decodedToken, // Pass the decoded token as a prop
    },
  };
}

export default Main;
