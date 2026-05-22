const productosService = require('../services/productsService');

const mostrarHome = (req, res) => {
  const sugeridos = productosService.getDestacados().slice(0, 5);
  const masPedidos = productosService.getMasPedidos().slice(0, 10);
  res.render('home', { sugeridos, masPedidos });
};

module.exports = { mostrarHome };