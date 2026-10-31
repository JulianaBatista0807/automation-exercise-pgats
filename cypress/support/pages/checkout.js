class Checkout {
  validarCarrinho(qtdItens) {
    cy.url().should('include', '/view_cart')
    cy.get('#cart_info_table tbody tr').should('have.length', qtdItens)
  }

  prosseguirParaCheckout() {
    cy.contains('.check_out', 'Proceed To Checkout').click()
  }

  validarEndereco(u) {
    cy.url().should('include', '/checkout')
    ;['#address_delivery', '#address_invoice'].forEach((sel) => {
      cy.get(sel)
        .should('contain', u.address1)
        .and('contain', u.city)
        .and('contain', u.country)
        .and('contain', u.mobile_number)
    })
    cy.get('#cart_info tbody tr').should('have.length.greaterThan', 0)
  }

  fazerPedido(comentario) {
    cy.get('textarea[name="message"]').type(comentario)
    cy.contains('a', 'Place Order').click()
  }

  pagar(u) {
    cy.url().should('include', '/payment')
    cy.get('[data-qa="name-on-card"]').type(u.name)
    cy.get('[data-qa="card-number"]').type('4111111111111111')
    cy.get('[data-qa="cvc"]').type('123')
    cy.get('[data-qa="expiry-month"]').type('12')
    cy.get('[data-qa="expiry-year"]').type('2030')
    cy.get('[data-qa="pay-button"]').click()
  }

  validarPedidoConfirmado() {
    cy.get('[data-qa="order-placed"]').should('be.visible').and('contain', 'Order Placed!')
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
  }
}
export default new Checkout()
