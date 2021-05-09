const productService = require('../services/product');

const productController = {
  async all(req, res) {
    const products = await productService.all();
    return res.json(products);
  },
  create(req, res) {
    const product = req.body;
    productService.create(product);
    res.sendStatus(200);
  },
};
module.exports = productController;
