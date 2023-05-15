import Checkpoint from "@/components/Checkpoints/NewCheckpoint"
import { GetServerSideProps } from "next"
import { IWOLcheckpoint, IPDCcheckpoint } from "../../../../types"
import { PrismaClient } from "@prisma/client"

type INewCheckpointProps = {
  id: number
  lastPDCheckpoint: IPDCcheckpoint
  lastWOLCheckpoint: IWOLcheckpoint
}
const prisma = new PrismaClient()

function NewCheckpoint({ id, lastPDCheckpoint, lastWOLCheckpoint }: INewCheckpointProps) {
  return (
    <Checkpoint id={id} lastPDCheckpoint={lastPDCheckpoint} lastWOLCheckpoint={lastWOLCheckpoint} ></Checkpoint>
  )
}
export default NewCheckpoint



export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: any = context.query;


  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

  const allPDs = await prisma.pDCcheckpoint.findMany({
    where: {
      traineeId: parseInt(id)
    }
  })

  const allWols = await prisma.wOLcheckpoint.findMany({
    where: {
      traineeId: parseInt(id)
    }
  })

  const lastPDCheckpoint = await prisma.pDCcheckpoint.findFirst({
    where: {
      traineeId: parseInt(id),
      createdAt: {
        gte: oneMonthAgo
      },
    },
    include: {
      SessionNotes: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })


  const lastWOLCheckpoint = await prisma.wOLcheckpoint.findFirst({
    where: {
      traineeId: parseInt(id),
      createdAt: {
        gte: oneMonthAgo
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  return {
    props: {
      id,
      lastPDCheckpoint: lastPDCheckpoint ? { ...lastPDCheckpoint, createdAt: lastPDCheckpoint.createdAt.toISOString() } : null,
      lastWOLCheckpoint: lastWOLCheckpoint ? { ...lastWOLCheckpoint, createdAt: lastWOLCheckpoint.createdAt.toISOString() } : null,
    },
  };
};