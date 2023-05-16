import Candidate from '@/components/CandidatePage/Candidate';
import { GetServerSideProps } from 'next';
import { authenticateAndGetToken } from '../../../lib/auth/authUtils';
import {
  ITrainee,
  IUser,
  IWOLcheckpoint,
  WOLCheckpointProps,
} from '../../../types';
import { PDCcheckpoint } from '@prisma/client';

interface IPageProps {
  person: ITrainee;
  WOLs: IWOLcheckpoint[];
  PDs: PDCcheckpoint[];
  decodedToken: Partial<IUser>;
}

export function Profile({ person, WOLs, PDs, decodedToken }: IPageProps) {
  return (
    <Candidate
      WOLs={WOLs}
      person={person}
      PDs={PDs}
      decodedToken={decodedToken}
    ></Candidate>
  );
}
export default Candidate;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const decodedToken = await authenticateAndGetToken(context);
  const cookies = context.req.headers.cookie;

  if (!cookies) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const { id }: any = context.query;
  const domainName = context.req.headers.host;

  const person = await fetch(`http://${domainName}/api/he/${id}`).then((res) =>
    res.json()
  );

  const WOLs = await fetch(`http://${domainName}/api/wol/wol`).then((res) =>
    res.json()
  );

  const PDs = await fetch(`http://${domainName}/api/pdc/pdc`).then((res) =>
    res.json()
  );

  return {
    props: {
      person,
      WOLs,
      PDs,
      decodedToken,
    },
  };
};
