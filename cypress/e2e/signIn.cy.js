/// <reference types="cypress" />

describe('Sign In page', () => {
  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/login');
  });

  it('Logs in with valid credentials', () => {
    cy.get('#username').type('tomsmith');
    cy.get('#password').type('SuperSecretPassword!');
    cy.get('button[type="submit"]').click();

    cy.get('#flash')
      .should('contain', 'You logged into a secure area!')
      .and('have.class', 'success');
  });

  it('Fails to login with invalid credentials', () => {
    cy.get('#username').type('invalidUser');
    cy.get('#password').type('wrongPassword!');
    cy.get('button[type="submit"]').click();

    cy.get('#flash')
      .should('contain', 'Your username is invalid!')
      .and('have.class', 'error');
  });

  it('Logs out successfully after login', () => {
    cy.get('#username').type('tomsmith');
    cy.get('#password').type('SuperSecretPassword!');
    cy.get('button[type="submit"]').click();

    cy.get('#flash')
      .should('contain', 'You logged into a secure area!');

    cy.contains('Logout').click();

    cy.url().should('include', '/login');

    cy.get('#flash')
      .should('contain', 'You logged out of the secure area!')
      .and('have.class', 'success');
  });
});
