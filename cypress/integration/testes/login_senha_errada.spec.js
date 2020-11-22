/// <reference types="cypress" />

context('Window', () => {
  beforeEach(() => {
      cy.visit('http://localhost:4200/login')
  })

  it('Deve digitar as credenciais e realizar o login', () => {
    cy.get('.mat-card-title').contains('Login')
    cy.get('#mat-input-0').type('johndoe@gmail.com', { delay: 100 })
    // Digita a senha errada
    cy.get('#mat-input-1').type('senha1jroie', { delay: 100 })
    cy.get('.mat-card-actions > .mat-focus-indicator').click()
  })

})
