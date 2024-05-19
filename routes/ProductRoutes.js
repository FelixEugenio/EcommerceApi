const express = require('express');
const { createProductController } = require('../controllers/ProductController');
const {authMiddleware,isAdmin} = require('../middlewares/auth/authMiddleware');

const router = express.Router();


router.post('/product',createProductController);
module.exports = router;