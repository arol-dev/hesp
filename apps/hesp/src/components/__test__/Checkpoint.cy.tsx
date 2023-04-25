import Checkpoint from "../Checkpoint"

const PD_HEADER = 'New Professional Development Checkpoint'
const WOL_HEADER = 'New WOL Checkpoint'
const TO_PD_BUTTON = 'Switch to Professional Development'
const TO_WOL_BUTTON = 'Switch to WOL'

describe('<Candidate />', () => {
    it('renders', () => {
        cy.mount(<Checkpoint />)
    })
    describe('tabs', () => {

        beforeEach(() => {
            cy.mount(<Checkpoint />)
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
            cy.mount(<Checkpoint />)
            cy.get('button').contains(TO_PD_BUTTON).click()
        })

        it('Has add new topic button', () => {
            cy.get('button').should('include.text', '+ Add Topic')
        })

        it('Starts a new topic form when add new topic button is clicked', () => {
            cy.get('form').should('have.length', 8)
            cy.get('button').contains('+ Add Topic').click()
            cy.get('form').should('have.length', 9)
        })

        /* it('has 7 progress bars', () => {
            cy.get('[data-cy=progress-bar]').should('have.length', 7)
        }) */
    })
})