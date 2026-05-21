const express = require('express');
const router = express.Router();
const { listarProductos, verDetalle, listarPorCategoria, buscarProductos } = require('../controllers/productoController');

router.get('/buscar', buscarProductos);
router.get('/categoria/:categoria', listarPorCategoria);
router.get('/:id', verDetalle);
router.get('/', listarProductos);

module.exports = router;