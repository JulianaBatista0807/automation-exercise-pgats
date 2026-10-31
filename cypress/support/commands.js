import { faker } from '@faker-js/faker'

// Gera dados únicos de usuário para cada execução
Cypress.Commands.add('gerarUsuario', () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  return {
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    email: `pgats.${Date.now()}.${faker.string.alphanumeric(5).toLowerCase()}@teste.com`,
    password: faker.internet.password({ length: 12 }),
    title: 'Mr',
    birth_date: '15',
    birth_month: 'May',
    birth_year: '1990',
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: 'Canada',
    zipcode: faker.location.zipCode('#####'),
    state: faker.location.state(),
    city: faker.location.city(),
    mobile_number: faker.string.numeric(10),
  }
})

// Pré-condição via API (mais rápido e estável que cadastrar pela interface)
Cypress.Commands.add('criarUsuarioApi', (u) => {
  cy.request({
    method: 'POST',
    url: '/api/createAccount',
    form: true,
    body: { ...u, firstname: u.firstName, lastname: u.lastName },
  }).then(({ body }) => {
    const res = typeof body === 'string' ? JSON.parse(body) : body
    expect(res.responseCode).to.eq(201)
  })
})

// Limpeza via API
Cypress.Commands.add('excluirUsuarioApi', (u) => {
  cy.request({
    method: 'DELETE',
    url: '/api/deleteAccount',
    form: true,
    body: { email: u.email, password: u.password },
    failOnStatusCode: false,
  })
})
