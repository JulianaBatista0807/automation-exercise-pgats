import home from '../support/pages/home'
import header from '../support/pages/header'
import products from '../support/pages/products'

describe('Produtos', () => {
  beforeEach(() => home.visitar())

  // Test Case 8: Verify All Products and product detail page
  it('TC08 - Verificar todos os produtos e página de detalhe', () => {
    header.products()
    products.validarListaVisivel()
    products.abrirPrimeiroProduto()
    products.validarDetalhes()
  })

  // Test Case 9: Search Product
  it('TC09 - Pesquisar produto', () => {
    const termo = 'Blue Top'
    header.products()
    products.validarListaVisivel()
    products.buscar(termo)
    products.validarResultadoBusca(termo)
  })
})
