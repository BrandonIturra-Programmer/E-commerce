const db = require('../../db/database');

const getCarrito = (req) => {
  if (!req.session.carrito) {
    req.session.carrito = [];
  }
  return req.session.carrito;
};

const agregarProducto = (req, producto) => {
  // US4 - Validar que el producto existe en la DB y obtener precio real
  const productoDb = db.prepare('SELECT * FROM products WHERE id = ?').get(producto.id);

  if (!productoDb) return; // Si no existe en la DB, no lo agregamos

  const carrito = getCarrito(req);
  const existente = carrito.find(p => p.id === productoDb.id);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({
      id: productoDb.id,
      nombre: productoDb.nombre,
      precio: productoDb.precio, // precio real desde la DB
      imagen: productoDb.imagen,
      cantidad: 1
    });
  }

  req.session.carrito = carrito;
};

const quitarProducto = (req, id) => {
  req.session.carrito = getCarrito(req).filter(p => p.id !== id);
};

const actualizarCantidad = (req, id, cantidad) => {
  const carrito = getCarrito(req);
  const producto = carrito.find(p => p.id === id);
  if (producto) {
    producto.cantidad = cantidad;
  }
  req.session.carrito = carrito;
};

const getTotal = (req) => {
  return getCarrito(req).reduce((acc, p) => acc + p.precio * p.cantidad, 0);
};

module.exports = { getCarrito, agregarProducto, quitarProducto, actualizarCantidad, getTotal };