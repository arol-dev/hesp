import Candidate from "@/components/Candidate"
import { GetServerSideProps } from "next"

function Profile({ person }) {
  return (
    <Candidate person={person}></Candidate>
  )
}
export default Candidate

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const response = fetch..
  const person = { id: "1", name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member', checkpoint: '5 days ago', status: 'active' }
  return {
    props: {
      person
    }
  }
}


