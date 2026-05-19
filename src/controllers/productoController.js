const productosService = require('../services/productsService');

const listarProductos = (req, res) => {
  const productos = productosService.getAll();
  res.render('productos/lista', { productos });
};

const verDetalle = (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productosService.getById(id);

  if (!producto) {
    return res.status(404).render('404');
  }

  const productos = productosService.getAll();
  res.render('productos/detalle', { producto, productos });
};

module.exports = { listarProductos, verDetalle };