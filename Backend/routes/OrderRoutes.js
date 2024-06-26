const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/OrderController')
const authMid = require('../milddleware/authMiddleware')

router.route('/')
    .get([authMid.isAuthenticated, authMid.adminOnlyAccess], OrderController.getAllOrder)

router.route('/user/:id')
    .get([authMid.isAuthenticated, authMid.userAccess], OrderController.getUserOrder)

router.route('/:order_id/gift')
    .patch([authMid.isAuthenticated], OrderController.giftOrder)
 
router.route('/checkout')
    .get(authMid.isAuthenticated, OrderController.checkout)

router.route('/checkout-success')
    .post(authMid.isAuthenticated, OrderController.createOrder)

router.route('/status/:order_id')
    .patch([authMid.isAuthenticated, authMid.adminOnlyAccess], OrderController.upadateStatus)
module.exports = router