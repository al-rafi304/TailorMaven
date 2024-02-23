const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');
const authMiddleware = require('../milddleware/authMiddleware');

// Base router: /api/v1/test

router.route('/').get(controller.helloWorld)

// passing isLoggedIn middleware ensures authorized access
// router.route('/test').get(authMiddleware.isLoggedIn, testFunction)

module.exports = router