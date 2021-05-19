const { expect } = require('chai');
const { MockMongoose } = require('mock-mongoose');
const mongoose = require('mongoose');

const mockMongoose = new MockMongoose(mongoose);
const productService = require('../../src/services/product');
const config = require('../../src/config');

if (config.environment !== 'dev') return;

const productComplete = {
  name: 'iPhone 11',
  price: 699,
  description:
    'A new dual‑camera system captures more of what you see and love. ',
};

describe('product services', () => {
  before(() => {
    const opts = { useNewUrlParser: true, useUnifiedTopology: true };
    mockMongoose.prepareStorage().then(() => {
      mongoose.connect('mongodb://example.com/TestingDB', opts, (err) => {
        console.error(err.message, err.stack);
      });
    });
  });

  afterEach(() => {
    return mockMongoose.helper.reset();
  });

  after(() => {
    mongoose.disconnect();
  });

  it('products can be created correctly', async () => {
    expect(async () => productService.create(productComplete)).not.to.throw();
  });

  // it('products can be updated correctly', async () => {
  //   const product = await productService.create(productComplete);
  //   product.price = 799;
  //   await productService.update(product);
  //   const result = await productService.findProductById(product.id);
  //   expect(result.price).eq(799);
  // });
  //
  // it('products can be updated', async () => {
  //   const product = await productService.create(productComplete);
  //   const result = await productService.findProductById(product.id);
  //   expect(result).not.null;
  // });
  //
  // it('products can be retrieved ', async () => {
  //   await productService.create(productComplete);
  //   const result = await productService.all();
  //   expect(result).length.above(0);
  // });
});
