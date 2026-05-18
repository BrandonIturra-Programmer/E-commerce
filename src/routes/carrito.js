const express = require('express');
const router = express.Router();
const { mostrarCarrito } = require('../controllers/carritoController');

router.get('/', mostrarCarrito);

module.exports = router;