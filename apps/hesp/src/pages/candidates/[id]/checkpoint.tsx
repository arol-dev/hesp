import Checkpoint from "@/components/Checkpoints/NewCheckpoint"
import { GetServerSideProps } from "next"

type Id = {
  id: number
}

function NewCheckpoint({ id }: Id) {
  return (
    <Checkpoint id={id}></Checkpoint>
  )
}
export default NewCheckpoint



export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: any = context.query;


  return {
    props: {
      id,
    },
  };
};