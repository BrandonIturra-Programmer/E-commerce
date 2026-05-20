const getCarrito = (req) => {
  if (!req.session.carrito) {
    req.session.carrito = [];
  }
  return req.session.carrito;
};

const agregarProducto = (req, producto) => {
  const carrito = getCarrito(req);
  const existente = carrito.find(p => p.id === producto.id);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
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