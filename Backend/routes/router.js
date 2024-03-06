const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');
const authMiddleware = require('../milddleware/authMiddleware');

// Base router: /api/v1/test

router.route('/user').get(controller.getAllUsers)       // Needs a middleware to check if it's an Admin request
router.route('/user/:id').all(authMiddleware.isAuthenticated).get(controller.getUser).patch(controller.updateUser)

router.route('/test').all(authMiddleware.isAuthenticated).get(controller.test)

// passing isAuthenticated middleware ensures authorized access
// router.route('/test').get(authMiddleware.isAuthenticated, testFunction)

module.exports = router