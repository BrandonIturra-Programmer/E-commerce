const express = require('express');
const router = express.Router();
const { listarProductos, verDetalle } = require('../controllers/productoController');

router.get('/', listarProductos);
router.get('/:id', verDetalle);

module.exports = router;