// authRoutes.js
const express = require('express');
const session = require('express-session');
const authController = require('../controllers/authController');
const authMiddleware = require('../milddleware/authMiddleware');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

// Authentication URI: /auth/google

router.get('/google', authController.authenticateGoogle);
router.get('/google/callback', authController.googleCallback);
router.get('/protected', authMiddleware.isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName} ${authMiddleware.isLoggedIn()}`);
});

router.get('/logout', authController.logout)

router.get('/auth/google/failure', authController.failure);

module.exports = router;
