import Checkpoint from "@/components/Checkpoint"

function NewCheckpoint({ id }: number) {
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