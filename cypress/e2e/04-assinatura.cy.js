import home from '../support/pages/home'

describe('Assinatura', () => {
  // Test Case 10: Verify Subscription in home page
  it('TC10 - Verificar assinatura na página inicial', () => {
    home.visitar()
    home.assinarNewsletter('pgats.newsletter@teste.com')
    cy.get('#success-subscribe')
      .should('be.visible')
      .and('contain', 'You have been successfully subscribed!')
  })
})
