const { expect } = require('chai');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const productService = require('../../src/services/product');

const productComplete = {
  name: 'iPhone 11',
  price: 699,
  description:
    'A new dual‑camera system captures more of what you see and love. ',
};

describe('product services', () => {
  let mongoServer;
  const opts = { useNewUrlParser: true, useUnifiedTopology: true };
  before(async () => {
    mongoServer = new MongoMemoryServer({ debug: true });
    const mongoUri = await mongoServer.getUri('test');
    await mongoose.connect(mongoUri, opts);
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
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
