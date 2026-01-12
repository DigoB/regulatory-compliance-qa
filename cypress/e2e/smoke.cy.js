describe('Smoke Test', () => {
  it('Abre uma página simples', () => {
    cy.visit('https://example.cypress.io')
    cy.contains('Kitchen Sink')
  })
})