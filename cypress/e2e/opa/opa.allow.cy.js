import '../../support/commands'

it('Deve retornar true para usuário admin', () => {
  cy.visit('https://play.openpolicyagent.org/')

  cy.opaSetEditorValue(0, `
    package auth

    default allow = false

    allow if {
      input.user == "admin"
    }
  `)

  cy.opaSetEditorValue(1, `{ "user": "admin" }`)

  cy.contains('button', 'Evaluate').click()

  cy.opaGetEditorValue(2).should('contain', 'true')
})
