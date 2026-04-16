const express = require('express');
const router = express.Router();
const { mostrarHome } = require('../controllers/homeController');

router.get('/', mostrarHome);

module.exports = router;