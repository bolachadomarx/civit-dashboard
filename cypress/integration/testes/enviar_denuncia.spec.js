/// <reference types="cypress" />

context('Window', () => {
  beforeEach(() => {
      cy.visit('http://localhost:4200/login')
  })

  it('Deve inserir denúncia', () => {
    // Realiza o login
    cy.get('#mat-input-0').type('johndoe@gmail.com', { delay: 100 })
    cy.get('#mat-input-1').type('senha123', { delay: 100 })
    cy.get('.mat-card-actions > .mat-focus-indicator').click({ delay: 100 })

    // Acessa a aba de denúncia
    cy.get('.mat-list-item-content').contains('Enviar denúncia').click()
    // Adiciona o problema
    cy.get('#mat-input-2').type('Árvore caída', { delay: 100 })
    // Seleciona opção no dropdown menu
    cy.get('#mat-select-0').click()
    cy.get('#mat-option-1').click()
    // Adiciona descrição
    cy.get('#mat-input-3').type('Uma árvore caiu na calçada da minha rua depois da chuva de ontem.', { delay: 100 })
    // Adiciona imagem
    cy.fixture('arvore.jpg').then(fileContent => {
      cy.get('#fileDropRef').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'arvore.jpg',
        mimeType: 'image/jpg'
      });
    });
    // Clica no mapa
    cy.get('.map-container').click(250,250)
    // Submete denúncia
    cy.get('.mat-card-actions > .mat-focus-indicator').click({delay:300})

  })
})
