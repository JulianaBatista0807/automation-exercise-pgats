class Header {
  signupLogin() { cy.contains('.navbar-nav a', 'Signup / Login').click() }
  products() { cy.contains('.navbar-nav a', 'Products').click() }
  cart() { cy.contains('.navbar-nav a', 'Cart').click() }
  logout() { cy.contains('.navbar-nav a', 'Logout').click() }
  deleteAccount() { cy.contains('.navbar-nav a', 'Delete Account').click() }
  validarLogadoComo(nome) {
    cy.contains('.navbar-nav li', `Logged in as ${nome}`).should('be.visible')
  }
}
export default new Header()
