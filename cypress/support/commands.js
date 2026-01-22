import { timeout } from "rxjs"

Cypress.Commands.add('opaGetEditor', (index) => {
  // Espera o CodeMirror existir (com retry)
  cy.window({timeout: 5000}).should((win) => {
    expect(win.CodeMirror).to.not.be.undefined
  })

  return cy.window().then((win) => {
    const editors = win.document.querySelectorAll('.CodeMirror')

    expect(
      editors[index],
      `Editor CodeMirror índice ${index}`
    ).to.not.be.undefined

    const cm = editors[index].CodeMirror

    expect(
      cm,
      `Instância CodeMirror índice ${index}`
    ).to.not.be.undefined

    return cm
  })
})

Cypress.Commands.add('opaSetEditorValue', (index, value) => {
  cy.opaGetEditor(index).then((cm) => {
    cm.setValue(value)
  })
})

Cypress.Commands.add('opaGetEditorValue', (index) => {
  return cy.opaGetEditor(index).then((cm) => {
    return cm.getValue()
  })
})
