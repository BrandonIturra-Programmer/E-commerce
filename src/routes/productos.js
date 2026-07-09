const express = require('express');
const router = express.Router();
const {
  listarProductos,
  verDetalle,
  crearProducto,
  modificarProducto,
  eliminarProducto,
  buscarProductos
} = require('../controllers/productoController');

router.get('/buscar',        buscarProductos);
router.get('/',              listarProductos);
router.get('/:id',           verDetalle);
router.post('/',             crearProducto);
router.put('/:id',           modificarProducto);
router.put('/:id/edit',      modificarProducto);
router.delete('/:id',        eliminarProducto);
router.delete('/:id/delete', eliminarProducto);

module.exports = router;