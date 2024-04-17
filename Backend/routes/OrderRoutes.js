const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/OrderController')
const authMid = require('../milddleware/authMiddleware')

router.route('/')
    .get([authMid.isAuthenticated, authMid.adminOnlyAccess], OrderController.getAllOrder)

router.route('/:id')
    .get([authMid.isAuthenticated, authMid.userAccess], OrderController.getUserOrder)

router.route('/:order_id/gift')
    .patch([authMid.isAuthenticated], OrderController.giftOrder)
 
router.route('/checkout')
    .get(authMid.isAuthenticated, OrderController.checkout)

router.route('/checkout-success')
    .get(OrderController.createOrder)

module.exports = router