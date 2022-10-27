/// <reference types="cypress" />

const getIframeDocument = () => {
  return cy
  .get('iframe[data-cy="iframe"]')
  // Cypress yields jQuery element, which has the real
  // DOM element under property "0".
  // From the real DOM iframe element we can get
  // the "document" element, it is stored in "contentDocument" property
  // Cypress "its" command can access deep properties using dot notation
  // https://on.cypress.io/its
  .its('0.contentDocument').should('exist')
}

const getIframeBody = () => {
  // get the document
  return getIframeDocument()
  // automatically retries until body is loaded
  .its('body').should('not.be.undefined')
  // wraps "body" DOM element to allow
  // chaining more Cypress commands, like ".find(...)"
  .then(cy.wrap)
}

describe('page', () => {
  it('works', () => {
    cy.visit('/')
    getIframeBody().find('[data-cy="p1"]').should('have.text', 'Some text')
    getIframeBody().find('[data-cy="p2"]').should('have.text', 'Some more text')
  })
})
