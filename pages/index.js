const LoginPage = require('./login.page');
const InventoryPage = require('./inventory.page');

module.exports = {
    loginPage: new LoginPage(),
    inventoryPage: new InventoryPage()
};
