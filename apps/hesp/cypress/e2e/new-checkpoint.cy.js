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

describe("checkpoint creation", () => {
  beforeEach(() => {
    cy.session([STAFF.email, STAFF.password], () => {
      cy.visit(url);
      cy.get('input[name="email"]').type(STAFF.email);
      cy.get('input[name="password"]').type(STAFF.password);
      cy.get('button[type="submit"]').click();
      cy.url().should("eq", `${url}/`);
    });
  });
  describe("trainee table has john", () => {
    it("has 2 trainees", () => {
      cy.visit(url);
      cy.get('[data-cy="trainee-row"]').should("have.length", 2);
    });
  });

  describe("trainee-table", () => {
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
      it("johns link to create a new checkpoint is enabled", () => {
        cy.visit(url);
        cy.get(`[data-cy-target=${john.firstName}]`).click();
        cy.get("h3").should("have.text", WOL_HEADER);
      });
    });

    ////////////////// JOHN ////////////////////////////
    describe("john checkpoint page", () => {
      beforeEach(() => {
        cy.visit(url);
        cy.get(`[data-cy-target=${john.firstName}]`).click();
      });
      describe("renders the checkpoint form", () => {
        it("starts in WOL", () => {
          cy.get("h3").should("have.text", WOL_HEADER);
          cy.get("h3").should("not.have.text", PD_HEADER);
        });

        it("wol checkpoint create enabled", () => {
          cy.get("[data-cy=wol-button]").should("exist");
        });

        it("switches to PD and back to WOL and check that both WOl and PD save button exist", () => {
          cy.get("[data-cy=wol-button]").should("exist");
          cy.get("button").contains(TO_PD_BUTTON);
          cy.get("[data-cy=switch-button]").click();
          cy.get("[data-cy=pd-button]").should("exist");
          cy.get("h3")
            .should("not.have.text", WOL_HEADER)
            .should("include.text", PD_HEADER);
          cy.get("button").contains(TO_WOL_BUTTON);
          cy.get("[data-cy=switch-button]").click();
          cy.get("h3")
            .should("not.have.text", PD_HEADER)
            .should("include.text", WOL_HEADER);
        });

        describe("WOL form", () => {
          it('should allow input in the "What makes you feel this way" textarea', () => {
            const testInput = "This is how I feel";
            cy.get("[data-cy=wol-topic-card]").each(($card, index) => {
              cy.wrap($card)
                .find('textarea[name="feel"]')
                .should("not.be.disabled")
                .type(testInput)
                .should("have.value", testInput);
            });
          });
          it('should allow input in the "What can you do to improve your satisfaction level?', () => {
            const testInput = "This is how I can improve";
            cy.get("[data-cy=wol-topic-card").each(($card, index) => {
              cy.wrap($card)
                .find('textarea[name="improve"]')
                .should("not.be.disabled")
                .type(testInput)
                .should("have.value", testInput);
            });
          });
          it("should check the checkbox, change the color when clicked, and uncheck when another number is clicked", () => {
            cy.get("[data-cy=wol-topic-card]").each(($card, index) => {
              // Check the first checkbox
              cy.wrap($card)
                .find('span[data-cy="bar-input"]')
                .first()
                .click()
                .should("have.class", "bg-blue-500 text-white");

              // Check the third checkbox
              cy.wrap($card)
                .find('span[data-cy="bar-input"]')
                .eq(2)
                .click()
                .should("have.class", "bg-blue-500 text-white");

              // Verify that the first checkbox is not checked
              cy.wrap($card)
                .find('span[data-cy="bar-input"]')
                .first()
                .should("not.have.class", "bg-blue-500 text-white");
            });
          });
          it("create a WOL checkpoint when save button is clicked", () => {
            cy.get("[data-cy=wol-topic-card]").each(($card, index) => {
              cy.wrap($card)
                .find('span[data-cy="bar-input"]')
                .first()
                .click()
                .should("have.class", "bg-blue-500 text-white");
            });

            const feelInput = "This is how I feel";
            cy.get("[data-cy=wol-topic-card]").each(($card, index) => {
              cy.wrap($card)
                .find('textarea[name="feel"]')
                .should("not.be.disabled")
                .type(feelInput)
                .should("have.value", feelInput);
            });

            const improveInput = "This is how I can improve";
            cy.get("[data-cy=wol-topic-card").each(($card, index) => {
              cy.wrap($card)
                .find('textarea[name="improve"]')
                .should("not.be.disabled")
                .type(improveInput)
                .should("have.value", improveInput);
            });

            cy.get("[data-cy=wol-button]").click();
            cy.get("button").contains(TO_PD_BUTTON);
            cy.get("[data-cy=switch-button]").click();
            cy.get("[data-cy=pd-button]").should("exist");
            cy.get("h3")
              .should("not.have.text", WOL_HEADER)
              .should("include.text", PD_HEADER);
            cy.get("button").contains(TO_WOL_BUTTON);
            cy.get("[data-cy=switch-button]").click();
            cy.get("h3")
              .should("not.have.text", PD_HEADER)
              .should("include.text", WOL_HEADER);
            cy.get("[data-cy=wol-button]").should("not.exist");
          });

          it('should not allow input in the "What makes you feel this way" textarea', () => {
            cy.get("[data-cy=last-wol-topic-card]").each(($card, index) => {
              cy.wrap($card)
                .find('textarea[name="feel"]')
                .should("be.disabled");
            });
          });

          it('should not allow input in the "What can you do to improve your satisfaction level?', () => {
            cy.get("[data-cy=last-wol-topic-card]").each(($card, index) => {
              cy.wrap($card)
                .find('textarea[name="improve"]')
                .should("be.disabled");
            });
          });

          it("should not allow checkbox to be clicked", () => {
            cy.get("[data-cy=last-wol-topic-card]").each(($card, index) => {
              cy.wrap($card).find("input[type=checkbox]").should("be.disabled");
            });
          });
        });
        describe("PD from", () => {
          it("should navigate to PD form and check that there is save button", () => {
            cy.get("button").contains(TO_PD_BUTTON);
            cy.get("[data-cy=switch-button]").click();
            cy.get("[data-cy=pd-button]").should("exist");
            cy.get("h3")
              .should("not.have.text", WOL_HEADER)
              .should("include.text", PD_HEADER);
          });
          it("should check the checkbox, change the color when clicked, and uncheck when another number is clicked", () => {
            cy.get("button").contains(TO_PD_BUTTON);
            cy.get("[data-cy=switch-button]").click();
            cy.get("[data-cy=pd-topic-card]").each(($card, index) => {
              cy.wrap($card)
                .find('span[data-cy="rating-input"]')
                .first()
                .click()
                .should("have.class", "bg-blue-500 text-white");

              // Check the third checkbox
              cy.wrap($card)
                .find('span[data-cy="rating-input"]')
                .eq(2)
                .click()
                .should("have.class", "bg-blue-500 text-white");

              // Verify that the first checkbox is not checked
              cy.wrap($card)
                .find('span[data-cy="rating-input"]')
                .first()
                .should("not.have.class", "bg-blue-500 text-white");
            });
          });
          it("should allow input in the first session note and save it", () => {
            const testInput = "This is first session note";
            cy.get("button").contains(TO_PD_BUTTON);
            cy.get("[data-cy=switch-button]").click();
            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=topic]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=objective]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=actions]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=notes]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=results]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=evaluation]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=save-note]").click();
          });

          it("should check that `add topic` button is disabled when the previous note is not saved", () => {
            cy.get("button").contains(TO_PD_BUTTON);
            cy.get("[data-cy=switch-button]").click();
            const stub = cy.stub();
            cy.on("window:alert", stub);

            cy.get("button[cy-data=add-topic]")
              .click()
              .then(() => {
                expect(stub.getCall(0)).to.be.calledWith(
                  "Please save the previous topic before adding a new one"
                );
              });
          });

          it("should create and render first saved session note correctly", () => {
            //create a note and save it
            const testInput = "This is first session note";
            cy.get("button").contains(TO_PD_BUTTON);
            cy.get("[data-cy=switch-button]").click();
            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=topic]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=objective]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=actions]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=notes]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=results]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=evaluation]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            // render saved note
            cy.get("[data-cy=save-note]").click();

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=topic]")
              .should("contain.text", testInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=objective]")
              .should("contain.text", testInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=actions]")
              .should("contain.text", testInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=notes]")
              .should("contain.text", testInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=results]")
              .should("contain.text", testInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=evaluation]")

              .should("contain.text", testInput);
          });

          it("should create and render first note, then successfully create second note", () => {
            const testInput = "This is first session note";
            cy.get("button").contains(TO_PD_BUTTON).click();

            // create and save first note
            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=topic]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=objective]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=actions]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=notes]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=results]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=evaluation]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=save-note]").click();

            // render first note
            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=topic]")
              .should("contain.text", testInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=objective]")
              .should("contain.text", testInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=actions]")
              .should("contain.text", testInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=notes]")
              .should("contain.text", testInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=results]")
              .should("contain.text", testInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=evaluation]")

              .should("contain.text", testInput);

            // create second note
            const stub = cy.stub();
            cy.on("window:alert", stub);

            cy.get("button[cy-data=add-topic]")
              .click()
              .then(() => {
                expect(stub.getCall(0)).to.be.calledWith(
                  "New note was created!"
                );
              });
          });

          it("should create and render first note, then successfully create second note, then save it it render both", () => {
            const testInput = "This is first session note";
            cy.get("button").contains(TO_PD_BUTTON);
            cy.get("[data-cy=switch-button]").click();

            // create and save first note
            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=topic]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=objective]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=actions]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=notes]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=results]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=evaluation]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=save-note]").click();

            // render first note
            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=topic]")
              .should("contain.text", testInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=objective]")
              .should("contain.text", testInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=actions]")
              .should("contain.text", testInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=notes]")
              .should("contain.text", testInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=results]")
              .should("contain.text", testInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=evaluation]")

              .should("contain.text", testInput);

            // create second note
            const stub = cy.stub();
            cy.on("window:alert", stub);

            cy.get("button[cy-data=add-topic]")
              .click()
              .then(() => {
                expect(stub.getCall(0)).to.be.calledWith(
                  "New note was created!"
                );
              });
            // fill second note and save
            const secondInput = "This is the second note";
            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=topic]")
              .should("not.be.disabled")
              .type(secondInput)
              .should("have.value", secondInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=objective]")
              .should("not.be.disabled")
              .type(secondInput)
              .should("have.value", secondInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=actions]")
              .should("not.be.disabled")
              .type(secondInput)
              .should("have.value", secondInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=notes]")
              .should("not.be.disabled")
              .type(secondInput)
              .should("have.value", secondInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=results]")
              .should("not.be.disabled")
              .type(secondInput)
              .should("have.value", secondInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=evaluation]")
              .should("not.be.disabled")
              .type(secondInput)
              .should("have.value", secondInput);

            cy.get("[data-cy=save-note]").click();

            // render first note again
            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=topic]")
              .should("contain.text", testInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=objective]")
              .should("contain.text", testInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=actions]")
              .should("contain.text", testInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=notes]")
              .should("contain.text", testInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=results]")
              .should("contain.text", testInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=evaluation]")

              .should("contain.text", testInput);

            // render second note
            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=topic]")
              .should("contain.text", secondInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=objective]")
              .should("contain.text", secondInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=actions]")
              .should("contain.text", secondInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=notes]")
              .should("contain.text", secondInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=results]")
              .should("contain.text", secondInput);

            cy.get("[data-cy=session-note-read-mode]")
              .find("div[id=evaluation]")

              .should("contain.text", secondInput);
          });

          it("should create a new PD checkpoint with 2 notes", () => {
            cy.get("button").contains(TO_PD_BUTTON).click();
            const testInput = "This is first session note";

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=topic]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=objective]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=actions]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=notes]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=results]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=evaluation]")
              .should("not.be.disabled")
              .type(testInput)
              .should("have.value", testInput);
            cy.get("[data-cy=save-note]").click();

            const stub = cy.stub();
            cy.on("window:alert", stub);

            cy.get("button[cy-data=add-topic]")
              .click()
              .then(() => {
                expect(stub.getCall(0)).to.be.calledWith(
                  "New note was created!"
                );
              });

            const secondInput = "This is the second note";
            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=topic]")
              .should("not.be.disabled")
              .type(secondInput)
              .should("have.value", secondInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=objective]")
              .should("not.be.disabled")
              .type(secondInput)
              .should("have.value", secondInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=actions]")
              .should("not.be.disabled")
              .type(secondInput)
              .should("have.value", secondInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=notes]")
              .should("not.be.disabled")
              .type(secondInput)
              .should("have.value", secondInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=results]")
              .should("not.be.disabled")
              .type(secondInput)
              .should("have.value", secondInput);

            cy.get("[data-cy=session-note-edit-mode]")
              .find("textarea[name=evaluation]")
              .should("not.be.disabled")
              .type(secondInput)
              .should("have.value", secondInput);

            cy.get("[data-cy=save-note]").click();

            cy.get("[data-cy=pd-topic-card]").each(($card, index) => {
              cy.wrap($card)
                .find('span[data-cy="rating-input"]')
                .first()
                .click()
                .should("have.class", "bg-blue-500 text-white");

              cy.get("[data-cy=pd-button]").click();
            });
          });
          it("checks that pd was saved", () => {
            cy.get("button").contains(TO_PD_BUTTON);
            cy.get("[data-cy=switch-button]").click();
            cy.get("[data-cy=pd-button]").should("not.exist");
            cy.get("h3")
              .should("not.have.text", WOL_HEADER)
              .should("include.text", PD_HEADER);
          });
        });
      });
    });
  });
});
