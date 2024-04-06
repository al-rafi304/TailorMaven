// authRoutes.js
const express = require('express');
const passport = require('passport')
const authController = require('../controllers/authController');

const { storage } = require('../milddleware/upload-config') 
const multer = require('multer');
const upload = multer({ storage });

const router = express.Router();

router.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

// Authentication URI: /auth

router.get('/google', passport.authenticate('google'));
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/google/failure'}), authController.googleCallback);

router.post('/register', upload.single('image'), authController.register)
router.post('/login', authController.login)
router.route('/checkLogin/:token').get(authController.checkLogin)


router.get('/auth/google/failure', authController.failure);

module.exports = router;
