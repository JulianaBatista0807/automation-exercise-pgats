class Products {
  validarListaVisivel() {
    cy.url().should('include', '/products')
    cy.contains('.features_items h2', 'All Products').should('be.visible')
    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0)
  }

  abrirPrimeiroProduto() {
    cy.get('.features_items a[href^="/product_details/"]').first().click()
    cy.url().should('include', '/product_details/')
  }

  validarDetalhes() {
    cy.get('.product-information').within(() => {
      cy.get('h2').should('be.visible').and('not.be.empty')
      cy.contains('p', 'Category:').should('be.visible')
      cy.contains('span span', /Rs\. \d+/).should('be.visible')
      cy.contains('b', 'Availability:').should('be.visible')
      cy.contains('b', 'Condition:').should('be.visible')
      cy.contains('b', 'Brand:').should('be.visible')
    })
  }

  buscar(termo) {
    cy.get('#search_product').type(termo)
    cy.get('#submit_search').click()
  }

  validarResultadoBusca(termo) {
    cy.contains('.features_items h2', 'Searched Products').should('be.visible')
    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0)
    cy.get('.features_items .productinfo p').each(($p) => {
      expect($p.text().toLowerCase()).to.contain(termo.toLowerCase())
    })
  }

  adicionarAoCarrinho(indice) {
    cy.get('.features_items .product-image-wrapper').eq(indice)
      .find('.productinfo a.add-to-cart').click({ force: true })
  }

  continuarComprando() {
    cy.get('#cartModal').should('be.visible')
    cy.contains('#cartModal button', 'Continue Shopping').click()
  }

  verCarrinhoNoModal() {
    cy.get('#cartModal').should('be.visible')
    cy.contains('#cartModal a', 'View Cart').click()
  }
}
export default new Products()
