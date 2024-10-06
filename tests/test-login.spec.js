const { loginPage, inventoryPage } = require('../pages/index');

describe('Swag Labs Auth Test Suite', () => {
    let users;

    before(() => {
        cy.fixture('users').then(usersData => {
            users = usersData;
        });
    });

    beforeEach(() => {
        loginPage.open();
    });

    it('should fail to log in with invalid user', () => {
        loginPage.login('invalid_user', 'wrong_password');
        loginPage.verifyLoginError();
    });

    it('should log in with valid user and logout', () => {
        loginPage.login(users.standard_user.email);
        loginPage.verifyLoggedIn();
        inventoryPage.logoutFromSwagLabs();
        inventoryPage.verifyOnLoginPage();
    });
});
