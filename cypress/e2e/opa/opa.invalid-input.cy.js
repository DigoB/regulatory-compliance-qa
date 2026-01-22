import '../../support/commands'

describe('OPA Playground - Invalid Input', () => {
  beforeEach(() => {
    cy.visit('https://play.openpolicyagent.org/')
  })

  it('Deve falhar quando input não contém user', () => {
    cy.opaSetEditorValue(0, `
      package auth

      default allow = false

      allow if {
        input.user == "admin"
      }
    `)

    cy.opaSetEditorValue(1, `{}`)

    cy.contains('button', 'Evaluate').click()

    cy.opaGetEditorValue(2).should('contain', 'false')
  })
})
