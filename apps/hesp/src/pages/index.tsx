import { authenticateAndGetToken } from "../../lib/auth/authUtils";
import Navbar from "@/components/Navbar";
import List from "@/components/MainPage";
import serverToDb from "../../lib/helperFuntions/serverToDb";
import { props } from "cypress/types/bluebird";
import { ITrainee, IUser } from "../../types";
import dateToISOString from "../../lib/helperFuntions/dataToIsoString";

interface props {
  user: IUser[];
  jwt: IUser;
  Trainees: ITrainee[];
}

const Main: React.FC<props> = ({ user, jwt, Trainees }) => {
  return (
    <div>
      <Navbar headerText={"HESP Program"}></Navbar>
      <List user={user} jwt={jwt} Trainees={Trainees}></List>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const decodedToken = await authenticateAndGetToken(context);
  const cookies = context.req.headers.cookie;

  if (!cookies) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const user = await serverToDb("User", "get");
  const HEs = await serverToDb("Trainee", "get");
  return {
    props: {
      user: user,
      jwt: decodedToken,
      Trainees: dateToISOString(HEs),
    },
  };
}

export default Main;
