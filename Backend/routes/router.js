const express = require('express');
const router = express.Router();

const {helloWorld} = require('../controllers/controller')

// Base router: /api/v1/test

router.route('/').get(helloWorld)


module.exports = router