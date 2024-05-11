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

router.post('/register',createUserController);
router.post('/login',loginUserController);
router.get('/users',getAllUsersController);
router.get('/user/:id',getUserController);
router.delete('/user/:id',deleteUserController);
router.put('/user/:id',updateUserController);

module.exports = router;