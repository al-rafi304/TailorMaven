const express = require('express');
const router = express.Router();

const SuitController = require('../controllers/SuitController')

const authMid = require('../milddleware/authMiddleware')

router.route('/')
    .get(SuitController.getAllSuit)
    .post(SuitController.createSuit)
router.route('/:id')
    .get(SuitController.getSuit)
    .patch(SuitController.updateSuit)
    .delete(SuitController.deleteSuit)

module.exports = router