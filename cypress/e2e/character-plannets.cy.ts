import { FindAndDo } from "cypress/support/find-and-do";

describe("Plannet Details Page", () => {
  beforeEach(() => {
    cy.visit("/star-wars/character/plannet/1");
  });
  
  it("should display loader", () => {
    FindAndDo.getElement('[data-cy="loader"]').should("exist");
  });

  it("should display plannet details", () => {
    FindAndDo.getElement('[data-cy="diameter-value"]').should("exist");
    FindAndDo.getElement('[data-cy="orbital-period"]').should("exist");
    FindAndDo.getElement('[data-cy="population"]').should("exist");
  });
});
