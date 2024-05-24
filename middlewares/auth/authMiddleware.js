const User = require('../../models/User/UserModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded?.id);
                if (user) {
                    req.user = user;
                    next();
                } else {
                    res.status(401);
                    throw new Error('User not found');
                }
            }
        } catch (error) {
            res.status(401);
            console.error('Token verification failed:', error.message);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const isAdmin = asyncHandler(async (req, res, next) => {
    if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, no user found');
    }
    const { email } = req.user;
    const adminUser = await User.findOne({ email });

    if (adminUser?.role !== "admin") {
        res.status(403);
        throw new Error('You are not an admin');
    } else {
        next();
    }
});

module.exports = { authMiddleware, isAdmin };
