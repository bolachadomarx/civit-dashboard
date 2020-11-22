/// <reference types="cypress" />

context('Window', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login')

  })
  it('Deve ir para a página de Cadastro, inserir as credenciais e submeter cadastro', () => {
    // Vai para a página de cadastro
    cy.get('.mat-card-subtitle').contains('clique aqui').click()
    // Insere as credenciais
    cy.get('#mat-input-2').type('John Doe', { delay: 100 })
    cy.get('#mat-input-3').type('49856923514', { delay: 100 })
    cy.get('#mat-input-4').type('johndoe@gmail.com', { delay: 100 })
    cy.get('#mat-input-5').type('(35)98156-8496', { delay: 100 })
    cy.get('#mat-input-6').type('senha123', { delay: 100 })
    cy.get('#mat-input-7').type('senha123', { delay: 100 })
    // Submete o formulário
    cy.get('.mat-card-actions > .mat-focus-indicator').click()
  })
})
