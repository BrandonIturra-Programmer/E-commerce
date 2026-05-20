const mostrarLogin = (req, res) => {
  res.render('auth/login');
};

const mostrarRegistro = (req, res) => {
  res.render('auth/registro', { errores: [] });
};

const procesarRegistro = (req, res) => {
  const { email, password, repetirPassword } = req.body;
  const errores = [];

  if (!email) {
    errores.push('El email es obligatorio');
  }

  if (!password) {
    errores.push('La contraseña es obligatoria');
  }

  if (password && password.length < 6) {
    errores.push('La contraseña debe tener al menos 6 caracteres');
  }

  if (password !== repetirPassword) {
    errores.push('Las contraseñas no coinciden');
  }

  if (errores.length > 0) {
    return res.render('auth/registro', { errores });
  }

  res.redirect('/auth/login');
};

module.exports = { mostrarLogin, mostrarRegistro, procesarRegistro };