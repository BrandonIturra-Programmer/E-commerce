const express = require('express');
const router = express.Router();
const { mostrarCarrito, agregarProducto, quitarProducto, actualizarCantidad } = require('../controllers/carritoController');

router.get('/', mostrarCarrito);
router.post('/agregar', agregarProducto);
router.post('/quitar/:id', quitarProducto);
router.post('/actualizar/:id', actualizarCantidad);
router.get('/checkout', (req, res) => {
  res.render('checkout');
});

module.exports = router;