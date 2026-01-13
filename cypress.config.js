const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://play.openpolicyagent.org',
    supportFile: 'cypress/support/e2e.js'
  }
})
