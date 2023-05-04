import Candidate from '@/components/CandidatePage/Candidate'
import { GetServerSideProps } from 'next'
import { authenticateAndGetToken } from '../../../lib/auth/authUtils'
import { ITrainee, IUser, IWOLcheckpoint } from '../../../types'
import { PDCcheckpoint } from '@prisma/client'

interface IPageProps {
  person: ITrainee
  WOLs: IWOLcheckpoint[]
  PDs: PDCcheckpoint[]
  decodedToken: Partial<IUser>
}

export function Profile({ person, WOLs, PDs, decodedToken }: IPageProps) {
  const updatePerson = (updatedPersonData: any) => {
    fetch(`http://localhost:3000/api/he/${updatedPersonData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPersonData),
    })
      .then((res) => res.json())
      .then((data) => {})
  }

  return (
    <Candidate
      WOLs={WOLs}
      person={person}
      PDs={PDs}
      updatePerson={updatePerson}
      decodedToken={decodedToken}
    />
  )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const decodedToken = await authenticateAndGetToken(context)
  const cookies = context.req.headers.cookie

  if (!cookies) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const { id }: any = context.query
  const domainName = context.req.headers.host

  const person = await fetch(`http://${domainName}/api/he/${id}`).then((res) =>
    res.json(),
  )

  const WOLs = await fetch(`http://${domainName}/api/wol/wol`).then((res) =>
    res.json(),
  )

  const PDs = await fetch(`http://${domainName}/api/pdc/pdc`).then((res) =>
    res.json(),
  )

  return {
    props: {
      person,
      WOLs,
      PDs,
      decodedToken,
    },
  }
}
