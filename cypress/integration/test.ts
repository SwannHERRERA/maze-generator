/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("localhost:8080");
  });

  it("sould contain basic of the app", () => {
    cy.get("h1").should("contain", "Maze generator");
    cy.get("#maze-generation-form");
    cy.get('.btn[type="submit"]');
    cy.get("[data-cy=form-select-maze]");
    cy.get("[data-cy=form-input-start]");
    cy.get("[data-cy=form-input-color]");
    cy.get("[data-cy=form-select-sale]");
    cy.get(".bottom-box").should("have.class", "hidden");
  });

  it("should generate the maze", () => {
    cy.get("[data-cy=submit-button]").click();
    cy.get("[data-cy=result-div]").children("svg");
    cy.get(".bottom-box").should("not.have.class", "hidden");
  });
});
