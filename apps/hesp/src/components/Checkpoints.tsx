import { PDCcheckpoint, WOLcheckpoint } from "@prisma/client"


type ICheckpointsProps = {
  id: number
  WOLs: WOLcheckpoint[]
  PDs: PDCcheckpoint[]
}
function Checkpoints({ id, WOLs, PDs }: ICheckpointsProps) {

  return (
    <div> hello</div>
  )
}

export default Checkpoints