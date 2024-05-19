const express = require('express');

const {
    createUserController,
    loginUserController,
    getAllUsersController,
    getUserController,
    deleteUserController,
    updateUserController,
    blockUserController,
    unblockUserController,
    handleRefreshToken,
    logoutController
} = require('../controllers/UserController');

const router = express.Router();
const {authMiddleware,isAdmin} = require('../middlewares/auth/authMiddleware');

router.post('/register',createUserController);
router.post('/login',loginUserController);
router.get('/users',authMiddleware,isAdmin,getAllUsersController);
router.get('/user/:id',authMiddleware,isAdmin,getUserController);
router.delete('/user/:id',deleteUserController);
router.put('/user/:id',updateUserController);
router.get('/block-user/:id',authMiddleware,isAdmin,blockUserController);
router.get('/unblock-user/:id',authMiddleware,isAdmin,unblockUserController);
router.get('/refresh',handleRefreshToken);
router.get('/logout',logoutController);

module.exports = router;