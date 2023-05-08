/// <reference types="cypress" />

//check environment to see if we are in vercel preview or local dev

let url = Cypress.env('host') ?? 'http://localhost:3000'
//if (!url) throw new Error('host env not found')
const INPUT_NAMES = ['email', 'password', 'remember']
const INPUT_TYPES = ['email', 'password']
const VALIDATION_MESSAGE = 'Please check your credentials and try again'

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
      cy.get('input[name="email"]').should('exist')
      cy.get('input[name="password"]').should('exist')
    })

    it('has required mail and password inputs', () => {
      cy.get('input').then(($inputs) => { 

        expect($inputs).to.have.length(3)
        $inputs.each((_, item) => {
          expect(item).to.have.attr('name').and.be.oneOf(INPUT_NAMES)
          if (item.name in INPUT_TYPES) {
            expect(item).to.have.attr('type').and.be.oneOf(INPUT_TYPES)
          }
        });
      })
    })

    it('has a submit button', () => {
      cy.get('button[type="submit"]').should('exist').and('have.text', 'Sign in')
    })
  })

  describe('form validation', () => {
    it('reject invalid credentials via windows.alert', () => {
      cy.get('input[name="email"]').type('test@test.test')
      cy.get('input[name="password"]').type('qwertyui_thisisnotapassword')
      cy.get('button[type="submit"]').click()
      cy.on('window:alert', (str) => {
        expect(str).to.equal(VALIDATION_MESSAGE)
      })
    })
    describe('pass with valid credentials', () => {
      it('pass with admin credentials', () => { 
        cy.get('input[name="email"]').type(ADMIN.email)
        cy.get('input[name="password"]').type(ADMIN.password)
        cy.get('button[type="submit"]').click().then(() => {
          cy.url().should('eq',`${url}/`)
        })
      })
      it('pass with staff credentials', () => { 
        cy.get('input[name="email"]').type(STAFF.email)
        cy.get('input[name="password"]').type(STAFF.password)
        cy.get('button[type="submit"]').click().then(() => {
          cy.url().should('eq',`${url}/`)
        })
       })
    })
  })
})
