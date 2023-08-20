describe('Initial Navigation', () => {
  it('Should redirect to star wars page', () => {
    cy.visit('/')
    cy.url().should('includes', 'star-wars/characters');
  })
  it('Should container List of Characters for first page', () => {
    cy.visit('/')
    cy.contains('List of Characters')
  })
})
