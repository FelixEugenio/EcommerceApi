const express=require('express');
const {
    createUserController,
    loginUserController,
    getAllUsersController,
    getUserController
} = require('../controllers/UserController')

const router = express.Router();

router.post('/register',createUserController);
router.post('/login',loginUserController);
router.get('/users',getAllUsersController);
router.get('/user/:id',getUserController);

module.exports = router;