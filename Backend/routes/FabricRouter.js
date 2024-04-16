const express = require('express');
const router = express.Router();

const { storage } = require('../configs/upload-config') 
const multer = require('multer');
const upload = multer({ storage });

const fabricController = require('../controllers/FabricController')

const authMid = require('../milddleware/authMiddleware')

router.route('/')
    .get(fabricController.getAllFabric)
    .post([authMid.isAuthenticated, authMid.adminOnlyAccess, upload.single('image')], fabricController.createFabric)
router.route('/:id')
    .get(fabricController.getFabric)
    .patch([authMid.isAuthenticated, authMid.adminOnlyAccess], fabricController.updateFabric)
    .delete([authMid.isAuthenticated, authMid.adminOnlyAccess], fabricController.deleteFabric)

module.exports = router