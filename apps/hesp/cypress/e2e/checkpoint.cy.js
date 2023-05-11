/// <reference types="cypress" />

let url = Cypress.env("host") ?? "http://localhost:3000";

const STAFF = {
  firstName: "Alice",
  lastName: "Andrews",
  role: "STAFF",
  email: "alice@prisma.io",
  password: "12345",
};

const bob = {
  firstName: "Bob",
  lastName: "Potter",
  email: "bob@prisma.io",
  phone: "+3497867853",
  registerNumber: "023/1234",
};

const john = {
  firstName: "John",
  lastName: "Williams",
  email: "john@prisma.io",
  phone: "+3497438963478853",
  registerNumber: "023/19764",
};

const hrefParts = ["candidates", "checkpoint"];

const PD_HEADER = "New Professional Development Checkpoint";
const WOL_HEADER = "New WOL Checkpoint";
const TO_PD_BUTTON = "Switch to Professional Development";
const TO_WOL_BUTTON = "Switch to WOL";

describe("checkpoints", () => {
  beforeEach(() => {
    cy.visit(url);
    cy.get('input[name="email"]').type(STAFF.email);
    cy.get('input[name="password"]').type(STAFF.password);
    cy.get('button[type="submit"]').click();
  });

  describe("home page", () => {
    it("has 2 trtainees", () => {
      cy.get('[data-cy="trainee-row"]').should("have.length", 2);
    });

    describe("checkpoint", () => {
      it("render the checkpoimnt", () => {
        cy.get("[data-cy=trainee-new-checkpoint]").should("have.length", 2);
        cy.get("[data-cy=trainee-new-checkpoint]").then(($links) => {
          $links.each((_, link) => {
            expect(link.href).to.exist;
            const href = link.getAttribute("href");
            hrefParts.forEach((part) => {
              href.includes(part);
            });
          });
        });
      });
      describe("bob checkpoint page", () => {
        beforeEach(() => {
          cy.get(`[data-cy-target=${bob.firstName}]`).click();
        });

        describe("renders the checkpoint info", () => {
          it("starts in WOL", () => {
            cy.get("h3").should("have.text", WOL_HEADER);
            cy.get("h3").should("not.have.text", PD_HEADER);
          });

          it("wol checkpoint create disabled", () => {
            cy.get("[data-cy=wol-button]").should("not.exist");
          });

          it("switches to PD and back to WOL and check that save button does not exist", () => {
            cy.get("[data-cy=wol-button]").should("not.exist");
            cy.get("button").contains(TO_PD_BUTTON).click();
            cy.get("[data-cy=pd-button]").should("not.exist");
            cy.get("h3")
              .should("not.have.text", WOL_HEADER)
              .should("include.text", PD_HEADER);
            cy.get("button").contains(TO_WOL_BUTTON).click();
            cy.get("h3")
              .should("not.have.text", PD_HEADER)
              .should("include.text", WOL_HEADER);
          });

          // describe('can not edit the values', () => {
          //   it('has all the inputs disabled', () => {
          //     cy.get('[data-cy=bar-input]').then($inputs => {
          //       $inputs.each((_, input) => {
          //         expect(input).to.be.disabled()
          //       })
          //     })
          //   })
          // })
        });
      });
      describe("john checkpoint page", () => {
        beforeEach(() => {
          cy.get(`[data-cy-target=${john.firstName}]`).click();
        });
        describe("renders the checkpoint info", () => {
          it("starts in WOL", () => {
            cy.get("h3").should("have.text", WOL_HEADER);
            cy.get("h3").should("not.have.text", PD_HEADER);
          });

          it("wol checkpoint create enabled", () => {
            cy.get("[data-cy=wol-button]").should("exist");
          });

          it("switches to PD and back to WOL and check that save button exists", () => {
            cy.get("[data-cy=wol-button]").should("exist");
            cy.get("button").contains(TO_PD_BUTTON).click();
            cy.get("[data-cy=pd-button]").should("exist");
            cy.get("h3")
              .should("not.have.text", WOL_HEADER)
              .should("include.text", PD_HEADER);
            cy.get("button").contains(TO_WOL_BUTTON).click();
            cy.get("h3")
              .should("not.have.text", PD_HEADER)
              .should("include.text", WOL_HEADER);
          });
        });
      });
    });
  });
});
