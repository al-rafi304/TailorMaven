const express = require('express');
const router = express.Router();

const fabricController = require('../controllers/FabricController')

const authMid = require('../milddleware/authMiddleware')

router.route('/')
    .get(fabricController.getAllFabric)
    .post(fabricController.createFabric)
router.route('/:id')
    .get(fabricController.getFabric)
    .patch(fabricController.updateFabric)
    .delete(fabricController.deleteFabric)

module.exports = router