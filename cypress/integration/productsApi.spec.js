const chai = require('chai');
chai.use(require('chai-json-schema'));
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
  it('As an API user, I can create products', () => {
    cy.request({
      method: 'POST',
      url: 'api/products',
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
        url: 'api/products',
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        response.body.forEach((product) =>
          expect(product).to.be.jsonSchema(productSchema)
        );
      });
    });
});
