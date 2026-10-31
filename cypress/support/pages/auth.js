class Auth {
  cadastrarInicio(nome, email) {
    cy.contains('.signup-form h2', 'New User Signup!').should('be.visible')
    cy.get('[data-qa="signup-name"]').type(nome)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.get('[data-qa="signup-button"]').click()
  }

  preencherConta(u) {
    cy.contains('b', 'Enter Account Information').should('be.visible')
    cy.get(u.title === 'Mrs' ? '#id_gender2' : '#id_gender1').check()
    cy.get('[data-qa="password"]').type(u.password, { log: false })
    cy.get('[data-qa="days"]').select(u.birth_date)
    cy.get('[data-qa="months"]').select(u.birth_month)
    cy.get('[data-qa="years"]').select(u.birth_year)
    cy.get('#newsletter').check()
    cy.get('#optin').check()
    cy.get('[data-qa="first_name"]').type(u.firstName)
    cy.get('[data-qa="last_name"]').type(u.lastName)
    cy.get('[data-qa="company"]').type(u.company)
    cy.get('[data-qa="address"]').type(u.address1)
    cy.get('[data-qa="address2"]').type(u.address2)
    cy.get('[data-qa="country"]').select(u.country)
    cy.get('[data-qa="state"]').type(u.state)
    cy.get('[data-qa="city"]').type(u.city)
    cy.get('[data-qa="zipcode"]').type(u.zipcode)
    cy.get('[data-qa="mobile_number"]').type(u.mobile_number)
    cy.get('[data-qa="create-account"]').click()
  }

  validarContaCriada() {
    cy.url().should('include', '/account_created')
    cy.get('[data-qa="account-created"]').should('be.visible').and('contain', 'Account Created!')
    cy.get('[data-qa="continue-button"]').click()
  }

  validarContaExcluida() {
    cy.url().should('include', '/delete_account')
    cy.get('[data-qa="account-deleted"]').should('be.visible').and('contain', 'Account Deleted!')
    cy.get('[data-qa="continue-button"]').click()
  }

  login(email, password) {
    cy.contains('.login-form h2', 'Login to your account').should('be.visible')
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(password, { log: false })
    cy.get('[data-qa="login-button"]').click()
  }
}
export default new Auth()
