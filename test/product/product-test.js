const { expect } = require('chai');
const dbHandler = require('./db-handler');
const productService = require('../../src/services/product');

const productComplete = {
  name: 'iPhone 11',
  price: 699,
  description:
    'A new dual‑camera system captures more of what you see and love. ',
};

describe('product services', () => {
  before(async () => {
    return dbHandler.connect();
  });
  after(async () => {
    return dbHandler.closeDatabase();
  });
  afterEach(async () => {
    return dbHandler.clearDatabase();
  });

  it('products can be created correctly', async () => {
    expect(async () => productService.create(productComplete)).not.to.throw();
  });

  it('products can be retrieved correctly', async () => {
    await productService.create(productComplete);
    const result = await productService.all();
    expect(result).length.above(0);
  });
});
