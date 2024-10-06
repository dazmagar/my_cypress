const { loginPage, inventoryPage } = require('../pages/index');

describe('Swag Labs Inventory Test Suite', () => {
    let users;

    before(() => {
        cy.fixture('users').then(usersData => {
            users = usersData;
        });
    });

    beforeEach(() => {
        loginPage.open();
    });

    it('User can order a backpack from the store', () => {
        loginPage.login(users.standard_user.email);
        loginPage.verifyLoggedIn();

        inventoryPage.savePriceOfItem('Backpack', 'item_price');
        inventoryPage.addItemToCart('Backpack');
        inventoryPage.verifyBadgeNumber(1);

        inventoryPage.clickShoppingCartIcon();
        inventoryPage.clickCheckout();
        inventoryPage.enterCheckoutInfo('First', 'Last', '12345');
        inventoryPage.clickContinue();

        inventoryPage.verifyItemInCart(1, 'Backpack');

        inventoryPage.verifyCostOfItem('Backpack', 'item_price');
        inventoryPage.verifyItemTotal('$29.99');
        inventoryPage.verifyTaxAmount('$2.40');
        inventoryPage.verifyTotalCost('$32.39');

        inventoryPage.clickFinish();
        inventoryPage.verifyOrderComplete();

        inventoryPage.logoutFromSwagLabs();
        inventoryPage.verifyOnLoginPage();
    });

    it('User can order two items from the store', () => {
        loginPage.login(users.standard_user.email);
        loginPage.verifyLoggedIn();

        inventoryPage.addItemToCart('Bike Light');
        inventoryPage.addItemToCart('Fleece Jacket');
        inventoryPage.verifyBadgeNumber(2);

        inventoryPage.clickShoppingCartIcon();
        inventoryPage.clickCheckout();
        inventoryPage.enterCheckoutInfo('First', 'Last', '54321');
        inventoryPage.clickContinue();

        inventoryPage.verifyItemInCart(1, 'Bike Light');
        inventoryPage.verifyItemInCart(1, 'Fleece Jacket');
        inventoryPage.verifyItemTotal('$59.98');
        inventoryPage.verifyTaxAmount('$4.80');
        inventoryPage.verifyTotalCost('$64.78');

        inventoryPage.clickFinish();
        inventoryPage.verifyOrderComplete();

        inventoryPage.logoutFromSwagLabs();
        inventoryPage.verifyOnLoginPage();
    });

    it('User can sort items by name from Z to A', () => {
        loginPage.login(users.standard_user.email);
        loginPage.verifyLoggedIn();

        inventoryPage.sortItemsFromZToA();
        inventoryPage.verifyItemOnTop('Test.allTheThings() T-Shirt');

        inventoryPage.logoutFromSwagLabs();
        inventoryPage.verifyOnLoginPage();
    });

    it('User can add & remove 6 items to/from cart', () => {
        loginPage.login(users.standard_user.email);
        loginPage.verifyLoggedIn();

        inventoryPage.addItemToCart('Backpack');
        inventoryPage.addItemToCart('Bike Light');
        inventoryPage.addItemToCart('Bolt T-Shirt');
        inventoryPage.addItemToCart('Fleece Jacket');
        inventoryPage.addItemToCart('Onesie');
        inventoryPage.addItemToCart('Test.allTheThings() T-Shirt');
        inventoryPage.verifyBadgeNumber(6);

        inventoryPage.removeItemFromCart('Backpack');
        inventoryPage.removeItemFromCart('Bike Light');
        inventoryPage.removeItemFromCart('Bolt T-Shirt');
        inventoryPage.removeItemFromCart('Fleece Jacket');
        inventoryPage.removeItemFromCart('Onesie');
        inventoryPage.removeItemFromCart('Test.allTheThings() T-Shirt');
        inventoryPage.verifyBadgeMissing();

        inventoryPage.logoutFromSwagLabs();
        inventoryPage.verifyOnLoginPage();
    });
});
