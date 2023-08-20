import { FindAndDo } from "cypress/support/find-and-do";

describe("Character List Page", () => {
  beforeEach(() => {
    cy.visit("/star-wars/characters");
  });

  it("should display loader", () => {
    FindAndDo.getElement('[data-cy="loader"]').should("exist");
  });

  it("should display characters list", () => {
    cy.get('[data-cy="character-name"]').should("have.length.gt", 0);
  });

  it("should navigate to character details page", () => {
    FindAndDo.getElement('[data-cy="character-name"]').first().click();
    cy.url().should("include", "/star-wars/character/");
  });

  it("should navigate to a different page when pagination button is clicked", () => {
    FindAndDo.findAndClick('[data-cy="next-btn"]');
    cy.url().should("include", "/star-wars/characters?page=");
  });
});
