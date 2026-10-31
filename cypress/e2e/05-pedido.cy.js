import home from '../support/pages/home'
import header from '../support/pages/header'
import auth from '../support/pages/auth'
import products from '../support/pages/products'
import checkout from '../support/pages/checkout'

function adicionarDoisProdutos() {
  header.products()
  products.adicionarAoCarrinho(0)
  products.continuarComprando()
  products.adicionarAoCarrinho(1)
  products.verCarrinhoNoModal()
  checkout.validarCarrinho(2)
}

function finalizarPedido(u) {
  checkout.prosseguirParaCheckout()
  checkout.validarEndereco(u)
  checkout.fazerPedido('Pedido de teste automatizado')
  checkout.pagar(u)
  checkout.validarPedidoConfirmado()
}

describe('Finalizar pedido', () => {
  // Test Case 15: Place Order: Register before Checkout
  it('TC15 - Finalizar pedido cadastrando-se antes do checkout', () => {
    cy.gerarUsuario().then((u) => {
      home.visitar()
      header.signupLogin()
      auth.cadastrarInicio(u.name, u.email)
      auth.preencherConta(u)
      auth.validarContaCriada()
      header.validarLogadoComo(u.name)

      adicionarDoisProdutos()
      finalizarPedido(u)

      header.deleteAccount()
      auth.validarContaExcluida()
    })
  })

  // Test Case 16: Place Order: Login before Checkout
  it('TC16 - Finalizar pedido fazendo login antes do checkout', () => {
    cy.gerarUsuario().then((u) => {
      cy.criarUsuarioApi(u)
      home.visitar()
      header.signupLogin()
      auth.login(u.email, u.password)
      header.validarLogadoComo(u.name)

      adicionarDoisProdutos()
      finalizarPedido(u)

      header.deleteAccount()
      auth.validarContaExcluida()
    })
  })
})
