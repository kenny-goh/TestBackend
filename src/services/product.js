const { mongo } = require('mongoose');
const productModel = require('../models/product');

module.exports.update = async (product) => {
  await productModel.updateOne(
    { _id: new mongo.ObjectID(product.id) },
    { $set: product }
  );
};

module.exports.create = async (product) => {
  if (!product) throw new Error('Missing product');
  return productModel.create(product);
};

module.exports.findProductById = async (id) => productModel.findById(new mongo.ObjectId(id));

module.exports.all = async () => productModel.find({}).exec();

module.exports.delete = async (id) => {
  await productModel.deleteOne({ _id: new mongo.ObjectId(id) });
};
