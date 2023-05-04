import React from 'react'
import Navbar from '../Navbar'

describe('<Candidate />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Navbar />)
  })
})