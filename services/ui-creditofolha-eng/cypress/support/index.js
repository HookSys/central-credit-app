import '@testing-library/cypress/add-commands'

// Necessário remover o fetch para que seja feito XHR requests
// cy.route não funciona com fetch API, com isso não é possível mockar requests
// nem esperar pela conclusão dos mesmos
Cypress.on('window:before:load', (win) => {
  /* eslint-disable-next-line no-param-reassign */
  delete win.fetch
})
