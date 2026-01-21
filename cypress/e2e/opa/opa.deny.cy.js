describe('OPA - deny policy', () => {

  it('deve retornar false quando user não é admin', () => {

    // 👇 tudo que começa com cy.* TEM que estar aqui dentro
    cy.visit('https://play.openpolicyagent.org/')

    cy.contains('button', 'Evaluate').click()

    cy.window().then((win) => {
      const editors = [...win.document.querySelectorAll('.CodeMirror')]

      const resultEditor = editors
        .map(e => e.CodeMirror)
        .find(cm => {
          const value = cm.getValue()
          return value.includes('true') || value.includes('false')
        })

      expect(resultEditor, 'Editor de resultado').to.not.be.undefined
      expect(resultEditor.getValue()).to.contain('false')
    })

  }
  )
})

describe('OPA Playground - Policy Error', () => {
  beforeEach(() => {
    cy.visit('https://play.openpolicyagent.org/')
  })

  it('Deve exibir erro ao avaliar policy inválida', () => {
    cy.get('.CodeMirror', { timeout: 10000 })
      .should('have.length.at.least', 3)

    cy.window().then((win) => {
      const editors = Array.from(
        win.document.querySelectorAll('.CodeMirror')
      ).map(el => el.CodeMirror)

      expect(editors[0], 'Policy editor').to.not.be.undefined
      expect(editors[1], 'Input editor').to.not.be.undefined

      editors[0].setValue(`
    package auth

    default allow = false

    allow {
      input.user == "admin"
    }
  `)

      editors[1].setValue(`
    {
      "user": "guest"
    }
  `)
    })
    
  })
})
