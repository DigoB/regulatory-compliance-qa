describe('OPA - Policy Allow', () => {
    it('Deve retornar allow = true para input válido', () => {
        cy.visit('/')

        cy.contains('Policy').click()
        const policy = `
    package auth

    default allow = false

    allow if {
        input.user == "admin"
    }
            `.trim()

        cy.window().then((win) => {
            const policyEditor = win.document
                .querySelectorAll('.CodeMirror')[0]
                .CodeMirror

            policyEditor.setValue(policy)
        })


        cy.window().then((win) => {
            const editors = win.document.querySelectorAll('.CodeMirror')

            const inputEditor = editors[1].CodeMirror

            inputEditor.setValue(`{
                "user": "admin"
                }`)
        })

        cy.get('._buttonGroup_rtrik_28').click()
        cy.get('.CodeMirror')
            .eq(3)
            .contains('true')
    })
})