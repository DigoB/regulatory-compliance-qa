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

  })

})
