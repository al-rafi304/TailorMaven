const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

const authMid = require('../milddleware/authMiddleware');

// Base router: /api/v1/test

router.route('/').get(userController.getAllUsers)       // Needs a middleware to check if it's an Admin request
router.route('/:id').all(authMid.isAuthenticated, authMid.authorizeUser)
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)


module.exports = router