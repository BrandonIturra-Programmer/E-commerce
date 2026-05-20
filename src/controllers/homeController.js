const productosService = require('../services/productsService');

const mostrarHome = (req, res) => {
  const destacados = productosService.getDestacados();
  const masPedidos = productosService.getMasPedidos();
  res.render('home', { destacados, masPedidos });
};

module.exports = { mostrarHome };