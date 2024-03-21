const express = require('express');
const router = express.Router();

const fabricController = require('../controllers/FabricController')

const authMid = require('../milddleware/authMiddleware')

router.route('/')
    .get(fabricController.getAllFabric)
    .post([authMid.isAuthenticated, authMid.adminOnlyAccess], fabricController.createFabric)
router.route('/:id')
    .get(fabricController.getFabric)
    .patch([authMid.isAuthenticated, authMid.adminOnlyAccess], fabricController.updateFabric)
    .delete([authMid.isAuthenticated, authMid.adminOnlyAccess], fabricController.deleteFabric)

module.exports = router