const productModel = require('../models/product');

/**
 * Stores a new product into the database.
 * @param {Object} product product object to create.
 * @throws {Error} If the product is not provided.
 */
module.exports.create = async (product) => {
  if (!product) throw new Error('Missing product');
  await productModel.create(product);
};

/**
 * Fetch all products
 * @returns {Promise<Array<Document>>}
 */
module.exports.all = async () => productModel.find({}).exec();
