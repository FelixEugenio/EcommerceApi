const express = require('express');

const { 
     createProductController,
     getProductController,
     getAllProductController,
     deleteProductController,
     updateProductController
     } = require('../controllers/ProductController');

const {authMiddleware,isAdmin} = require('../middlewares/auth/authMiddleware');

const router = express.Router();

router.post('/product',createProductController);
router.get('/product/:id',getProductController);
router.get('/product',getAllProductController);
router.delete('/product/:id',isAdmin,authMiddleware,deleteProductController);
router.put('/product/:id',isAdmin,authMiddleware,updateProductController);

module.exports = router;