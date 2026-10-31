import home from '../support/pages/home'
import header from '../support/pages/header'
import auth from '../support/pages/auth'

describe('Login e logout', () => {
  beforeEach(function () {
    cy.gerarUsuario().then((u) => {
      this.usuario = u
      cy.criarUsuarioApi(u)
    })
  })

  afterEach(function () {
    cy.excluirUsuarioApi(this.usuario)
  })

  // Test Case 2: Login User with correct email and password
  it('TC02 - Login com e-mail e senha corretos', function () {
    home.visitar()
    header.signupLogin()
    auth.login(this.usuario.email, this.usuario.password)
    header.validarLogadoComo(this.usuario.name)
  })

  // Test Case 3: Login User with incorrect email and password
  it('TC03 - Login com e-mail e senha incorretos', function () {
    home.visitar()
    header.signupLogin()
    auth.login(this.usuario.email, 'senha-incorreta-123')
    cy.contains('.login-form p', 'Your email or password is incorrect!').should('be.visible')
    cy.contains('.navbar-nav li', 'Logged in as').should('not.exist')
  })

  // Test Case 4: Logout User
  it('TC04 - Logout de usuário', function () {
    home.visitar()
    header.signupLogin()
    auth.login(this.usuario.email, this.usuario.password)
    header.validarLogadoComo(this.usuario.name)
    header.logout()
    cy.url().should('include', '/login')
    cy.contains('.login-form h2', 'Login to your account').should('be.visible')
  })
})
