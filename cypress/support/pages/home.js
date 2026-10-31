class Home {
  visitar() {
    cy.visit('/')
    cy.get('.carousel-inner').should('be.visible')
    cy.title().should('contain', 'Automation Exercise')
  }
  assinarNewsletter(email) {
    cy.get('footer').scrollIntoView()
    cy.contains('footer h2', 'Subscription').should('be.visible')
    cy.get('#susbscribe_email').type(email)
    cy.get('#subscribe').click()
  }
}
export default new Home()
