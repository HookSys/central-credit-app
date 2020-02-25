describe('Realizar o login no sistemas', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('realiza o login no módulo consignado empresa', () => {
    const user = Cypress.env('user')
    const password = Cypress.env('password')

    cy.server()
    cy.route('GET', '**/funcoes').as('getFunctions')

    cy.findByPlaceholderText('E-mail')
      .type(user)
      .should('have.value', user)
    cy.findByPlaceholderText('Senha')
      .type(password)
      .should('have.value', password)
    cy.get('button[type=submit]')
      .click()

    cy.wait('@getFunctions')

    cy.findByText(/^Consignado Empresa/i)
      .should('exist')
      .click().as('selectEmployee')
    cy.get('.dashboard')
      .should('exist')
  })
})
