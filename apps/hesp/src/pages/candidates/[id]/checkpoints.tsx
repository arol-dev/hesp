import Checkpoints from '@/components/Checkpoints/AllCheckpoints';
import { GetServerSideProps } from 'next';
import { authenticateAndGetToken } from '../../../../lib/auth/authUtils';

function AllCheckpoints({ id, WOLs, PDs }: any) {
  return <Checkpoints id={id} WOLs={WOLs} PDs={PDs}></Checkpoints>;
}
export default AllCheckpoints;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const decodedToken = await authenticateAndGetToken(context);
  const cookies = context.req.headers.cookie;

  if (!cookies || !decodedToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  const { id }: any = context.query;

  const domainName = context.req.headers.host;

  const WOLs = await fetch(`http://${domainName}/api/wol/${id}`).then((res) =>
    res.json()
  );

  const PDs = await fetch(`http://${domainName}/api/pdc/${id}`).then((res) =>
    res.json()
  );

  return {
    props: {
      id,
      WOLs,
      PDs,
    },
  };
};
