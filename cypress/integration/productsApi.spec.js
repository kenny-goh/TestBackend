const chai = require('chai');
chai.use(require('chai-json-schema'));
const config = require('../../src/config');
const expect = chai.expect;

const productSchema = {
  title: 'Product Schema v1',
  type: 'object',
  required: ['name', 'description', 'price'],
  properties: {
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    price: {
      type: 'number',
    },
  },
};

describe('Products API test', () => {
  const PRODUCTS_API_PATH = config.contextPath + '/api/products';
  it('As an API user, I can create products', () => {
    cy.request({
      method: 'POST',
      url: PRODUCTS_API_PATH,
      body: {
        name: 'Iphone 11',
        price: 999,
        description: 'Booyah',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  }),
    it('As an API user, I can fetch all products', () => {
      cy.request({
        method: 'GET',
        url: PRODUCTS_API_PATH,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        response.body.forEach((product) =>
          expect(product).to.be.jsonSchema(productSchema)
        );
      });
    });
});
