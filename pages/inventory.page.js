import { gaussTimeout } from '../cypress/support/helpers';

class InventoryPage {
    addItemToCart(item) {
        cy.get('.inventory_item_name').contains(item).parents('.inventory_item').find('button[name*="add"]').click();
        gaussTimeout();
    }

    savePriceOfItem(item, varName) {
        cy.get('.inventory_item_name')
            .contains(item)
            .parents('.inventory_item')
            .find('.inventory_item_price')
            .then($price => {
                const price = $price.text();
                cy.task('setData', { key: varName, value: price });
            });
        gaussTimeout();
    }

    removeItemFromCart(item) {
        cy.get('div.inventory_item').filter(`:contains("${item}")`).find('[id*="remove"]').click();
        gaussTimeout();
    }

    verifyBadgeNumber(number) {
        cy.get('span.shopping_cart_badge').should('have.text', number);
        gaussTimeout();
    }

    verifyBadgeMissing() {
        cy.get('span.shopping_cart_badge').should('not.exist');
        gaussTimeout();
    }

    clickShoppingCartIcon() {
        cy.get('#shopping_cart_container a').click();
        gaussTimeout();
    }

    clickCheckout() {
        cy.get('#checkout').click();
        cy.location('pathname').should('eq', '/checkout-step-one.html');
        gaussTimeout();
    }

    enterCheckoutInfo(firstName, lastName, zipCode) {
        cy.get('#first-name').type(firstName);
        gaussTimeout();
        cy.get('#last-name').type(lastName);
        gaussTimeout();
        cy.get('#postal-code').type(zipCode);
        gaussTimeout();
    }

    clickContinue() {
        cy.get('input#continue').click();
        gaussTimeout();
    }

    verifyItemInCart(quantity, item) {
        cy.get('.cart_item').filter(`:contains("${item}")`).find('.cart_quantity').should('have.text', quantity);
        gaussTimeout();
    }

    verifyCostOfItem(item, varName) {
        cy.task('getData', varName).then(expectedPrice => {
            cy.get('.cart_item').filter(`:contains("${item}")`).find('.inventory_item_price').should('have.text', expectedPrice);
        });
        gaussTimeout();
    }

    verifyItemTotal(itemTotal) {
        cy.get('div.summary_subtotal_label').contains(`Item total: ${itemTotal}`);
        gaussTimeout();
    }

    verifyTaxAmount(taxAmount) {
        cy.get('div.summary_tax_label').should('have.text', `Tax: ${taxAmount}`);
        gaussTimeout();
    }

    verifyTotalCost(totalCost) {
        cy.get('div.summary_total_label').should('have.text', `Total: ${totalCost}`);
        gaussTimeout();
    }

    clickFinish() {
        cy.get('button#finish').click();
        gaussTimeout();
    }

    verifyOrderComplete() {
        cy.get('h2').should('have.text', 'Thank you for your order!');
        cy.get('img[alt="Pony Express"]').should('be.visible');
    }

    verifyOnLoginPage() {
        cy.get('#login-button').should('be.visible');
        gaussTimeout();
    }

    sortItemsFromZToA() {
        cy.get('select.product_sort_container').select('Name (Z to A)');
        gaussTimeout();
    }

    verifyItemOnTop(item) {
        cy.get('div.inventory_item_name').first().should('contain.text', item);
        gaussTimeout();
    }

    logoutFromSwagLabs() {
        cy.jsClick('a#logout_sidebar_link');
        gaussTimeout();
    }
}

module.exports = InventoryPage;
