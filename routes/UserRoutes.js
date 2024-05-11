const express = require('express');

const {
    createUserController,
    loginUserController,
    getAllUsersController,
    getUserController,
    deleteUserController,
    updateUserController
} = require('../controllers/UserController');

const router = express.Router();
const {authMiddleware} = require('../middlewares/auth/authMiddleware');

router.post('/register',createUserController);
router.post('/login',loginUserController);
router.get('/users',authMiddleware,getAllUsersController);
router.get('/user/:id',authMiddleware,getUserController);
router.delete('/user/:id',deleteUserController);
router.put('/user/:id',updateUserController);

module.exports = router;