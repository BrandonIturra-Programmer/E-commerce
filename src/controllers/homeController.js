const productosService = require('../services/productsService');

const mostrarHome = (req, res) => {
  const todos = productosService.getAll();

  const sugeridos = todos.slice(0, 5);

  const masPedidos = todos
    .filter(p => p.destacado === true)
    .slice(0, 10);

  res.render('home', { sugeridos, masPedidos });
};

module.exports = { mostrarHome };