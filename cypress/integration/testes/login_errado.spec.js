/// <reference types="cypress" />

context('Window', () => {
  beforeEach(() => {
      cy.visit('http://localhost:4200/login')
  })

  it('Deve digitar as credenciais e realizar o login', () => {
    cy.get('.mat-card-title').contains('Login')
    // Digita o login errado
    cy.get('#mat-input-0').type('johndoe@outlook.com', { delay: 100 })
    cy.get('#mat-input-1').type('senha123', { delay: 100 })
    cy.get('.mat-card-actions > .mat-focus-indicator').click()
  })
})
