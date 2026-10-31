import './commands'

// O site de exercício dispara erros de JS de anúncios/terceiros que não são parte do teste
Cypress.on('uncaught:exception', () => false)

const adHosts = [
  '**/*googlesyndication.com/**',
  '**/*doubleclick.net/**',
  '**/*googleadservices.com/**',
  '**/*google-analytics.com/**',
  '**/*googletagmanager.com/**',
  '**/*adtrafficquality.google/**',
]

beforeEach(() => {
  // Bloqueia anúncios (vignette) que cobrem a tela e quebram cliques
  adHosts.forEach((url) => cy.intercept(url, { statusCode: 204, body: '' }))
})

// Remove iframes de anúncio/consentimento que eventualmente sejam injetados
Cypress.on('window:load', (win) => {
  const clean = () => {
    win.document
      .querySelectorAll('ins.adsbygoogle, iframe[id^="aswift"], iframe[id^="google_ads"], .fc-consent-root')
      .forEach((el) => el.remove())
  }
  clean()
  new win.MutationObserver(clean).observe(win.document.documentElement, { childList: true, subtree: true })
})
