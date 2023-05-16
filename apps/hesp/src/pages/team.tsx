import Navbar from '@/components/Navbar';
import Teampage from '@/components/Team/Teampage';
import { GetServerSideProps } from 'next';
import { IUser } from '../../types';
import { authenticateAndGetToken } from '../../lib/auth/authUtils';
import serverToDb from '../../lib/helperFuntions/serverToDb';

interface ITeamProps {
  coaches: IUser[];
}

function Team({ coaches }: ITeamProps) {
  return (
    <>
      <Teampage coaches={coaches}></Teampage>
    </>
  );
}
export default Team;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const coaches = await serverToDb('User', 'get');

  const decodedToken = await authenticateAndGetToken(context);
  const cookies = context.req.headers.cookie;

  if (!decodedToken || !cookies) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      coaches,
    },
  };
};
