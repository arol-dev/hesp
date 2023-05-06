/// <reference types="cypress" />


//check environment to see if we are in vercel preview or local dev

let url = Cypress.env('host')
if (!url) throw new Error('host env not found')

const ADMIN = {
  firstName: "Mike",
  lastName: "Wazowski",
  role: "ADMIN",
  email: "mike@prisma.io",
  password: '12345'
}

const STAFF = {
  firstName: "Alice",
  lastName: "Andrews",
  role: "STAFF",
  email: "alice@prisma.io",
  password: '12345'
}

describe('login page', () => {
  
  beforeEach(() => {
    cy.visit(url)
  })

  describe('form structure', () => {
    it('exist', () => {
      cy.get('form').should('exist')
    })
    it('has required inputs', () => {
      cy.get('input').should('have.length', 2)
    })
    it('has a submit button', () => {
      cy.get('button[type="submit"]').should('exist').and('have.text', 'Sign in')
    })
  })
})
