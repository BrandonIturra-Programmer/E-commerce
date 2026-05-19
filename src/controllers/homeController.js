const productosService = require('../services/productsService');

const mostrarHome = (req, res) => {
  const productos = productosService.getAll();
  res.render('home', { productos });
};

module.exports = { mostrarHome };