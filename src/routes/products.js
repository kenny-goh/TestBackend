const express = require('express');
const { body, validationResult } = require('express-validator');
const productService = require('../services/product');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const products = await productService.all();
  console.log(products);
  res.render('products', { products });
});

router.get('/add', async (req, res, next) => {
  res.render('products_add', {});
});

router.post('/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  const product = await productService.findProductById(id);
  res.render('products_edit', { product });
});

router.post(
  '/add',
  body('name', 'Please enter a name').notEmpty(),
  body('description', 'Please enter a description').notEmpty(),
  body('price', 'Please enter price').isNumeric(),
  async (req, res) => {
    const errors = validationResult(req);
    const { name, description, price } = req.body;
    const product = {
      name,
      description,
      price,
    };
    if (errors.isEmpty()) {
      console.log(`creating product ${product}`);
      await productService.create(product);
      res.redirect('/products');
    } else {
      console.log(errors);
      res.render('products_add', {
        product,
        errors: errors.errors,
      });
    }
  },
);

router.post(
  '/update',
  body('name', 'Please enter a name').notEmpty(),
  body('description', 'Please enter a description').notEmpty(),
  body('price', 'Please enter price').isNumeric(),
  async (req, res) => {
    const errors = validationResult(req);
    const { id, name, description, price } = req.body;
    const product = {
      id,
      name,
      description,
      price,
    };
    if (errors.isEmpty()) {
      console.log(`updating product ${JSON.stringify(product)}`);
      await productService.update(product);
      res.redirect('/products');
    } else {
      console.log(errors);
      res.render('products_edit', {
        product,
        errors: errors.errors,
      });
    }
  },
);

router.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await productService.delete(id);
  res.redirect('/products');
});

module.exports = router;
