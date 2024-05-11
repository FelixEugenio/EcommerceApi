const express=require('express');
const {
    createUserController,
    loginUserController,
    getAllUsersController
} = require('../controllers/UserController')

const router = express.Router();

router.post('/register',createUserController);
router.post('/login',loginUserController);
router.get('/users',getAllUsersController);

module.exports = router;