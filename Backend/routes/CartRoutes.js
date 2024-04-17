const express = require('express');
const router = express.Router();

const authMid = require('../milddleware/authMiddleware')
const cartController = require('../controllers/CartController')

router.route('/')
    .get([authMid.isAuthenticated, authMid.adminOnlyAccess], cartController.getAllCartItem)
    .post(authMid.isAuthenticated, cartController.addToCart)
<<<<<<< HEAD
router.route('/:id')
    .get([authMid.isAuthenticated, authMid.userAccess], cartController.getUserCart)
=======
router.route('/:item_id')
>>>>>>> f6bb1ece46862f7877aac79b5c19e7b5767e17c8
    .delete([authMid.isAuthenticated, authMid.userAccess], cartController.deleteCartItem)
router.route('/:id')
    .get([authMid.isAuthenticated, authMid.userAccess], cartController.getUserCart)

module.exports = router