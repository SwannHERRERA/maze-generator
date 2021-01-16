/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("localhost:8080");
  });


  it("sould contain basic of the app", () => {
    cy.get('[data-cy=title]').should("contain", "Maze generator");
    cy.get('[data-cy=submit-form]');
    cy.get('[data-cy=submit-button]');
    cy.get('[data-cy=form-select-maze]');
    cy.get('[data-cy=form-input-start]');
    cy.get('[data-cy=form-input-color]');
    cy.get('[data-cy=form-select-sale]');
  });

  it("should generate the maze", () => {
      cy.get('[data-cy=submit-button]').click();
      cy.get('[data-cy=result-div]').children('svg');
    });
});
