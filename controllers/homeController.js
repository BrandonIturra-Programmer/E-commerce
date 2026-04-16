const productos = require('../models/producto');

const mostrarHome = (req, res) => {
  res.render('home', { productos });
};

module.exports = { mostrarHome };