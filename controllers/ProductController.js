const { json } = require('body-parser');
const Product = require('../models/Product/ProductModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

// criando produto
const createProductController = asyncHandler(async (req, res) => {
  try {

    if(req.body.title){
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    console.error(err); // Adicione logging para depuração
    res.status(500).json({ message: err.message }); // Envie uma resposta de erro adequada
  }
});

//pegando um produto pelo id

const getProductController = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try{


    const findProduct = await Product.findById(id);
    res.json(findProduct);

    }catch(error){
    throw new Error(error);
    }
});

// pegando todos os produtos

const getAllProductController = asyncHandler(async(req,res)=>{
    try{
        const findAllProducts = await Product.find();
        res.json(findAllProducts);
    
        }catch(error){
        throw new Error(error);
        }
});

// Eliminando um produto

const deleteProductController = asyncHandler(async(req,res)=>{
    try{
        const {id} = req.params;
    
        const deleteProduct = await Product.findByIdAndDelete(id);
    
        res.json(deleteProduct);
      }catch(error){
        throw new Error(error);
      }
});

// atualizando Produto

const updateProductController = asyncHandler(async(req,res)=>{

  const {id} = req.body;
  try{
   if(req.body.title){
     req.body.slug = slugify(req.body.title);
   }
   const updateProduct = await Product.findOneAndUpdate(id,req.body, {
    new:true
   });
   res.json(updateProduct)
  }catch(error){
  throw new Error(error)
  }

});

module.exports = {
  createProductController,
  getProductController,
  getAllProductController,
  deleteProductController,
  updateProductController
};
