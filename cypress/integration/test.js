/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("localhost:8080");
  });
  it("sould contain basic of the app", () => {
    cy.get("h1").should("contain", "Maze generator");
    cy.get("form");
  });
});
