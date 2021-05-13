const express = require('express');
const { body, validationResult } = require('express-validator');
const productService = require('../services/product');
const config = require('../config');

const router = express.Router();

const ADD_URL = `${config.contextPath}/products/add`;
const LIST_URL = `${config.contextPath}/products`;
const EDIT_URL = `${config.contextPath}/products/edit`;
const DELETE_URL = `${config.contextPath}/products/delete`;
const UPDATE_URL = `${config.contextPath}/products/update`;

router.get('/', async (req, res, next) => {
  const products = await productService.all();
  const addUrl = ADD_URL;
  const editUrl = EDIT_URL;
  const deleteUrl = DELETE_URL;
  res.render('products', { products, addUrl, editUrl, deleteUrl });
});

router.get('/add', async (req, res, next) => {
  const addActionUrl = ADD_URL;
  const listUrl = LIST_URL;
  res.render('products_add', { addActionUrl, listUrl });
});

router.post('/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  const updateUrl = UPDATE_URL;
  const listUrl = LIST_URL;
  const product = await productService.findProductById(id);
  res.render('products_edit', { product, updateUrl, listUrl });
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
      res.redirect(LIST_URL);
    } else {
      console.log(errors);
      res.render('products_add', {
        product,
        errors: errors.errors,
      });
    }
  }
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
      res.redirect(LIST_URL);
    } else {
      console.log(errors);
      res.render('products_edit', {
        product,
        errors: errors.errors,
      });
    }
  }
);

router.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await productService.delete(id);
  res.redirect(LIST_URL);
});

module.exports = router;
