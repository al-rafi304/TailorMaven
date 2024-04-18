const express = require('express');
const router = express.Router();

const SuitController = require('../controllers/SuitController')

const authMid = require('../milddleware/authMiddleware')

router.route('/')
    .get(SuitController.getAllSuit)
    .post(authMid.isAuthenticated, SuitController.createSuit)
router.route('/:id')
    .get(SuitController.getSuit)
    .patch(authMid.isAuthenticated, SuitController.updateSuit)
    .delete(authMid.isAuthenticated, SuitController.deleteSuit)

router.route('/price/get')
    .get(SuitController.getPrice)

module.exports = router