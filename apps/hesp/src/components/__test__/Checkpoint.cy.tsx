import Checkpoint from "../Checkpoints/NewCheckpoint"

import * as Router from "next/router"

const PD_HEADER = 'New Professional Development Checkpoint'
const WOL_HEADER = 'New WOL Checkpoint'
const TO_PD_BUTTON = 'Switch to Professional Development'
const TO_WOL_BUTTON = 'Switch to WOL'
const TEST_ID = 12

let router

describe('<Candidate />', () => {

    beforeEach(() => {
        router = {
            back: cy.stub().as('routerBack')
        }

        cy.stub(Router, 'useRouter').returns(router)
    })

    it('renders', () => {
        cy.mount(<Checkpoint id={TEST_ID} />)
    })
    describe('tabs', () => {

        beforeEach(() => {
            cy.mount(<Checkpoint id={TEST_ID} />)
        })

        it('starts in WOL', () => {
            cy.get('h3').should('have.text', WOL_HEADER)
            cy.get('h3').should('not.have.text', PD_HEADER)
        })

        it('switches to PD and back to WOL', () => {
            cy.get('button').contains(TO_PD_BUTTON).click()
            cy.get('h3').should('not.have.text', WOL_HEADER).should('include.text', PD_HEADER)

            cy.get('button').contains(TO_WOL_BUTTON).click()
            cy.get('h3').should('not.have.text', PD_HEADER).should('include.text', WOL_HEADER)
        })
    })

    describe('PD form', () => {
        beforeEach(() => {
            cy.mount(<Checkpoint id={12} />)
            cy.get('button').contains(TO_PD_BUTTON).click()
        })

        it('Has add new topic button', () => {
            cy.get('button').should('include.text', '+ Add Topic')
        })

        it('Starts a new topic form when add new topic button is clicked', () => {
            let baseLength: number | undefined
            cy.get('form').should(($forms) => {
                baseLength = $forms.length
            })
            cy.get('button').contains('+ Add Topic').click()
            if (baseLength) {
                cy.get('form').should("have.length", baseLength + 1)
            }
        })
    })
})