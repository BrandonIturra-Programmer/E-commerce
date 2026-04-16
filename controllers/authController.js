const mostrarLogin = (req, res) => {
  res.render('auth/login');
};

const mostrarRegistro = (req, res) => {
  res.render('auth/registro');
};

module.exports = { mostrarLogin, mostrarRegistro };