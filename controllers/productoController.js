const productos = require('../models/producto');

const listarProductos = (req, res) => {
  res.render('productos/lista', { productos });
};

const verDetalle = (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    return res.status(404).send('Producto no encontrado');
  }

  res.render('productos/detalle', { producto, productos }); // 👈 agregamos productos
};

module.exports = { listarProductos, verDetalle };