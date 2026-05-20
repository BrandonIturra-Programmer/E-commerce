const cartService = require('../services/cartService');

const mostrarCarrito = (req, res) => {
  const carrito = cartService.getCarrito(req);
  const total = cartService.getTotal(req);
  res.render('carrito', { carrito, total });
};

const agregarProducto = (req, res) => {
  const producto = {
    id: parseInt(req.body.id),
    nombre: req.body.nombre,
    precio: parseInt(req.body.precio),
    imagen: req.body.imagen
  };
  cartService.agregarProducto(req, producto);
  res.redirect('/carrito');
};

const quitarProducto = (req, res) => {
  const id = parseInt(req.params.id);
  cartService.quitarProducto(req, id);
  res.redirect('/carrito');
};

const actualizarCantidad = (req, res) => {
  const id = parseInt(req.params.id);
  const cantidad = parseInt(req.body.cantidad);
  cartService.actualizarCantidad(req, id, cantidad);
  res.redirect('/carrito');
};

module.exports = { mostrarCarrito, agregarProducto, quitarProducto, actualizarCantidad };