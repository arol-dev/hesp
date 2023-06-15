/// <reference types="cypress" />

// let url = Cypress.env("host") ?? "http://localhost:3000";

let url = "http://localhost:3000";

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

const WOL_HEADER = "New WOL Checkpoint";

const hrefParts = ["candidates", "checkpoint"];

describe("main page", () => {
  beforeEach(() => {
    cy.session([STAFF.email, STAFF.password], () => {
      cy.visit(url);
      cy.get('input[name="email"]').type(STAFF.email);
      cy.get('input[name="password"]').type(STAFF.password);
      cy.get('button[type="submit"]').click();
      cy.url().should("eq", `${url}/`);
    });
  });

  describe("page", () => {
    it("has add new candidate button", () => {
      cy.visit(url);
      cy.get('[data-cy="add-new-candidate"]').should("exist");
    });
  });

  describe("trainee table", () => {
    it("has 2 trainees", () => {
      cy.visit(url);
      cy.get('[data-cy="trainee-row"]').should("have.length", 2);
    });

    it("has links to create a new checkpoint for each trainee", () => {
      cy.visit(url);
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
    it("bobs link to create a new checkpoint is disabled", () => {
      cy.visit(url);
      cy.get("[data-cy=trainee-new-checkpoint]")
        .should("have.length", 2)
        .then(($links) => {
          const firstLink = $links.eq(0);
          cy.wrap(firstLink).should(($link) => {
            const pointerEvents = $link.css("pointer-events");
            expect(pointerEvents).to.equal("none");
          });
        });
    });

    it("johns link to create a new checkpoint is enabled", () => {
      cy.visit(url);
      cy.get(`[data-cy-target=${john.firstName}]`).click();
      cy.get("h3").should("have.text", WOL_HEADER);
    });
  });
});
