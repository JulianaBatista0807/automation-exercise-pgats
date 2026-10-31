import home from '../support/pages/home'
import header from '../support/pages/header'
import auth from '../support/pages/auth'

describe('Cadastro de usuário', () => {
  // Test Case 1: Register User
  it('TC01 - Cadastrar um novo usuário com sucesso', () => {
    cy.gerarUsuario().then((u) => {
      home.visitar()
      header.signupLogin()
      auth.cadastrarInicio(u.name, u.email)
      auth.preencherConta(u)
      auth.validarContaCriada()
      header.validarLogadoComo(u.name)
      header.deleteAccount()
      auth.validarContaExcluida()
    })
  })

  // Test Case 5: Register User with existing email
  it('TC05 - Cadastrar usuário com e-mail já existente', () => {
    cy.gerarUsuario().then((u) => {
      cy.criarUsuarioApi(u)
      home.visitar()
      header.signupLogin()
      auth.cadastrarInicio(u.name, u.email)
      cy.contains('.signup-form p', 'Email Address already exist!').should('be.visible')
      cy.excluirUsuarioApi(u)
    })
  })
})
