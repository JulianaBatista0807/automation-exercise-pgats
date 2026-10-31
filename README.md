# Automação Web - Automation Exercise

Projeto de automação de testes end-to-end com **Cypress** para a aplicação [Automation Exercise](https://automationexercise.com), implementando os casos de teste da página [Test Cases](https://automationexercise.com/test_cases).

[![Cypress Tests](https://github.com/JulianaBatista0807/automation-exercise-pgats/actions/workflows/cypress.yml/badge.svg)](https://github.com/JulianaBatista0807/automation-exercise-pgats/actions/workflows/cypress.yml)

## Casos de teste implementados

| Caso | Descrição | Arquivo |
| ---- | --------- | ------- |
| 1 | Register User | [01-cadastro.cy.js](cypress/e2e/01-cadastro.cy.js) |
| 2 | Login User with correct email and password | [02-login.cy.js](cypress/e2e/02-login.cy.js) |
| 3 | Login User with incorrect email and password | [02-login.cy.js](cypress/e2e/02-login.cy.js) |
| 4 | Logout User | [02-login.cy.js](cypress/e2e/02-login.cy.js) |
| 5 | Register User with existing email | [01-cadastro.cy.js](cypress/e2e/01-cadastro.cy.js) |
| 8 | Verify All Products and product detail page | [03-produtos.cy.js](cypress/e2e/03-produtos.cy.js) |
| 9 | Search Product | [03-produtos.cy.js](cypress/e2e/03-produtos.cy.js) |
| 10 | Verify Subscription in home page | [04-assinatura.cy.js](cypress/e2e/04-assinatura.cy.js) |
| 15 | Place Order: Register before Checkout | [05-pedido.cy.js](cypress/e2e/05-pedido.cy.js) |
| 16 | Place Order: Login before Checkout | [05-pedido.cy.js](cypress/e2e/05-pedido.cy.js) |

## Tecnologias

- [Cypress](https://www.cypress.io/) 13
- [Faker](https://fakerjs.dev/) para geração de dados dinâmicos
- [Mochawesome](https://github.com/adamgruber/mochawesome) para relatórios HTML
- GitHub Actions para integração contínua

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- npm

## Instalação

```bash
npm install
```

## Como executar

| Comando | O que faz |
| ------- | --------- |
| `npm run cy:open` | Abre o Cypress em modo interativo |
| `npm run cy:run` | Executa todos os testes em modo headless |
| `npm run report` | Mescla os resultados e gera o relatório HTML |

Para executar um único arquivo:

```bash
npx cypress run --spec cypress/e2e/02-login.cy.js
```

> **Atenção (VS Code):** se o Cypress falhar com `bad option: --smoke-test`, a variável `ELECTRON_RUN_AS_NODE` está definida no terminal integrado. Execute `unset ELECTRON_RUN_AS_NODE` (bash) ou `Remove-Item Env:ELECTRON_RUN_AS_NODE` (PowerShell), ou use um terminal comum.

## Relatórios

Após `npm run cy:run`, execute `npm run report`. O relatório fica em:

```
cypress/reports/html/index.html
```

Em caso de falha, os screenshots são salvos em `cypress/screenshots/`.

## Integração contínua (GitHub Actions)

O workflow [.github/workflows/cypress.yml](.github/workflows/cypress.yml) é executado a cada `push`, `pull request` ou manualmente (aba **Actions** > **Run workflow**). Ele:

1. Instala as dependências (`npm ci`)
2. Executa os testes no Chrome
3. Gera o relatório HTML
4. Publica os artefatos da execução:
   - `mochawesome-report`: relatório HTML dos testes
   - `cypress-screenshots`: screenshots (somente em caso de falha)

Para baixar o relatório: abra a execução na aba **Actions** e procure a seção **Artifacts**.

## Estrutura do projeto

```
.
├── .github/workflows/cypress.yml   # Pipeline do GitHub Actions
├── cypress/
│   ├── e2e/                        # Specs dos casos de teste
│   └── support/
│       ├── commands.js             # Comandos customizados (dados, API)
│       ├── e2e.js                  # Configurações globais (bloqueio de anúncios)
│       └── pages/                  # Page Objects
├── cypress.config.js               # Configuração do Cypress e do reporter
└── package.json
```

## Boas práticas adotadas

- **Page Object Pattern:** ações e validações de cada página ficam em `cypress/support/pages/`, mantendo os testes legíveis e sem duplicação.
- **Seletores estáveis:** uso prioritário dos atributos `data-qa` fornecidos pela aplicação; ids e classes apenas quando necessário.
- **Dados dinâmicos:** cada teste gera um usuário único com Faker, evitando conflito entre execuções.
- **Testes independentes:** cada teste cria seus próprios dados e os remove ao final, sem depender da ordem de execução.
- **Pré-condições e limpeza via API:** usuários são criados e excluídos pelos endpoints `/api/createAccount` e `/api/deleteAccount`, o que torna os testes mais rápidos e estáveis.
- **Estabilidade:** anúncios do Google são bloqueados para não cobrirem a tela, não há esperas fixas (`cy.wait`) e o modo `run` tem 2 retentativas.
- **Segurança nos logs:** senhas são digitadas com `log: false`.
- **Configuração centralizada:** `baseUrl` definida em `cypress.config.js`.
