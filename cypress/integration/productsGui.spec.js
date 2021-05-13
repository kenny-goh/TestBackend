const config = require('../../src/config');

const PRODUCT_PATH = config.contextPath + '/products';
const ADD_PRODUCT_PATH = config.contextPath + '/products/add';

describe('Products GUI test', () => {
  it('As an administrator, I can visits products page', () => {
    cy.visit(PRODUCT_PATH);
  }),
    it('As an administrator, I can add products via the backend gui', () => {
      cy.visit(PRODUCT_PATH);
      cy.get('button').click();
      cy.url().should('contains', ADD_PRODUCT_PATH);
      cy.get('#name').click();
      cy.get('#name').type('test product 1');
      cy.get('#description').type('test');
      cy.get('#price').type('100');
      cy.get('td:nth-child(1) > input').click();
      cy.url().should('contains', PRODUCT_PATH);

      // verify
      const expectedRow = {
        Name: 'test product 1',
        Price: '100',
        Description: 'test',
      };
      cy.get('#productsTable')
        .getTable({ onlyColumns: Object.keys(expectedRow) })
        .should((tableData) => {
          expect(tableData).to.deep.include(expectedRow);
        });
    }),
    it('As an administrator, I can edit products via the backend gui', () => {
      cy.visit(PRODUCT_PATH);
      cy.get('td:nth-child(1) .button').last().click();
      cy.get('#name').click();
      cy.get('#name').clear();
      cy.get('#name').type('test product 2');
      cy.get('#price').clear();
      cy.get('#price').type('200');
      cy.get('td:nth-child(1) > input').click();
      cy.url().should('contains', PRODUCT_PATH);

      // verify
      const expectedRow = {
        Name: 'test product 2',
        Price: '200',
        Description: 'test',
      };
      cy.get('#productsTable')
        .getTable({ onlyColumns: Object.keys(expectedRow) })
        .should((tableData) => {
          expect(tableData).to.deep.include(expectedRow);
        });
    }),
    it('As an administrator, I can delete products via the backend gui', () => {
      cy.visit(PRODUCT_PATH);
      let preLength = 0;
      cy.get('#productsTable')
        .find('tr')
        .then((row) => {
          preLength = row.length;
        });
      cy.get('td:nth-child(2) .button').last().click();
      cy.url().should('contains', '/products');
      let postLength = 0;
      cy.get('#productsTable')
        .find('tr')
        .then((row) => {
          postLength = row.length;
          expect(preLength).to.be.above(postLength);
        });
    });
});
