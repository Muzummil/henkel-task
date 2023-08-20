import { FindAndDo } from "cypress/support/find-and-do";

describe("Character Details Page", () => {
  beforeEach(() => {
    cy.visit("/star-wars/character/1");
  });

  it("should display loader", () => {
    FindAndDo.getElement('[data-cy="loader"]').should("exist");
  });

  it("should display character name", () => {
    FindAndDo.getElement('[data-cy="character-name"]').should("exist");
  });

  it("should navigate back to characters list page", () => {
    FindAndDo.getElement('[data-cy="all-characters"]').click();
    cy.url().should("include", "/star-wars/characters");
  });

  it("should navigate to planet details page", () => {
    FindAndDo.getElement('[data-cy="check-plannets"]').click();
    cy.url().should("include", "/star-wars/character/plannet/");
  });
});
