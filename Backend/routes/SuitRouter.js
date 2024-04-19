const express = require('express');
const router = express.Router();

const { storage } = require('../configs/upload-config') 
const multer = require('multer');
const upload = multer({ storage });

const SuitController = require('../controllers/SuitController')

const authMid = require('../milddleware/authMiddleware')

router.route('/')
    .get(SuitController.getAllSuit)
    .post([authMid.isAuthenticated, upload.single('image')], SuitController.createSuit)
router.route('/:id')
    .get(SuitController.getSuit)
    .patch(authMid.isAuthenticated, SuitController.updateSuit)
    .delete(authMid.isAuthenticated, SuitController.deleteSuit)

router.route('/price/get')
    .get(SuitController.getPrice)

module.exports = router