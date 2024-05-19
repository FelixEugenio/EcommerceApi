const Product = require('../models/Product/ProductModel');
const asyncHandler = require('express-async-handler');

const createProductController = asyncHandler(async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    console.error(err); // Adicione logging para depuração
    res.status(500).json({ message: err.message }); // Envie uma resposta de erro adequada
  }
});

module.exports = {
  createProductController
};
