import { gaussTimeout } from '../cypress/support/helpers';

class LoginPage {
    open() {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
        cy.visit('/');
        cy.clearLocalStorage();
    }

    typeUsername(username) {
        cy.get('#user-name').should('be.visible').type(username);
        gaussTimeout();
    }

    typePassword(password) {
        cy.get('#password').should('be.visible').type(password);
        gaussTimeout();
    }

    submitLogin() {
        cy.get('.btn_action').should('be.visible').click();
        gaussTimeout();
    }

    login(username, password = 'secret_sauce') {
        this.typeUsername(username);
        this.typePassword(password);
        this.submitLogin();
    }

    verifyLoggedIn() {
        cy.location('pathname').should('eq', '/inventory.html');
        cy.get('#header_container').should('be.visible');
        cy.get('#react-burger-menu-btn').should('be.visible');
        cy.get('#shopping_cart_container').should('be.visible');
    }

    verifyLoginError() {
        cy.get('.error-message-container').should('be.visible');
    }
}

module.exports = LoginPage;
