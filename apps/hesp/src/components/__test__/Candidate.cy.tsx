import React from 'react'
import Candidate from '../Candidate'
import { IUser } from '../../../types'

const SAMPLE_USER: IUser = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'mymail@mail.com',
  phone: '123456789',
  reference: '123456789',
  Comment: [],
  PDCcheckpoint: [],
  role: 'STAFF',
  Trainee: [],
  WOLcheckpoint: [],
}

describe('<Candidate />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Candidate person={SAMPLE_USER} />)
  })
})