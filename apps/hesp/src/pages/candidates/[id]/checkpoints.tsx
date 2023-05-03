import Checkpoints from "@/components/Checkpoints"
import { GetServerSideProps } from "next"

function AllCheckpoints({ id, WOLs, PDs }: any) {
  return (
    <Checkpoints id={id} WOLs={WOLs} PDs={PDs}></Checkpoints>

  )
}
export default AllCheckpoints



export const getServerSideProps: GetServerSideProps = async (context) => {
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
      PDs
    },
  };
};