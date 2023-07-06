
Cypress.Commands.add('reloadUntilFound', ({url, selector, onSuccess, onError}) => {
    cy.visit(url)
    cy.get('body').then(async body => {
        if (body.find(selector).length===1) {
            await onSuccess(body.find(selector)[0])
        } else{
            onError()
            cy.reloadUntilFound({url, selector, onSuccess, onError})
        }
    })
})

Cypress.Commands.add('redeemAccess', code =>{
    cy.visit('https://electriccastle.com/redeem-access')

    cy.get('#code').type(code)

    cy.get('#name').type('Lung Andreea-Cristina')

    cy.get('#street').type('Str.Brandusa, bl.G33, ap.14')

    cy.get('#city').type('Satu Mare')

    cy.get('.ui-select-match > .btn-default').click()

    cy.get('#ui-select-choices-row-0-0 > .ui-select-choices-row-inner > div').click()

    cy.get('button[type="submit"]').contains("Submit").click()
})