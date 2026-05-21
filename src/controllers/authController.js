const mostrarLogin = (req, res) => {
  res.render('auth/login', {ocultarNav: true});
};

const mostrarRegistro = (req, res) => {
  res.render('auth/registro', { errores: [], ocultarNav: true });
};

const procesarRegistro = (req, res) => {
  const { nombre, apellido, email, password, repetirPassword } = req.body;
  const errores = [];

  // Campos obligatorios
  if (!nombre || nombre.trim() === '') errores.push('El nombre es obligatorio');
  if (!apellido || apellido.trim() === '') errores.push('El apellido es obligatorio');
  if (!email || email.trim() === '') errores.push('El email es obligatorio');
  if (!password || password.trim() === '') errores.push('La contraseña es obligatoria');

  // Email válido
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) errores.push('El email no es válido');

  // Contraseña igual al email
  if (password && email && password === email) errores.push('La contraseña no puede ser igual al email');

  // Contraseña mínimo 6 caracteres
  if (password && password.length < 6) errores.push('La contraseña debe tener al menos 6 caracteres');

  // Al menos una letra
  if (password && !/[a-zA-Z]/.test(password)) errores.push('La contraseña debe incluir al menos una letra');

  // Al menos un número
  if (password && !/[0-9]/.test(password)) errores.push('La contraseña debe incluir al menos un número');

  // Al menos un carácter especial
  if (password && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) errores.push('La contraseña debe incluir al menos un carácter especial');

  // Cadenas prohibidas
  const prohibidas = ['password', '1234', 'qwerty', 'miecommerce'];
  if (password) {
    prohibidas.forEach(p => {
      if (password.toLowerCase().includes(p)) errores.push(`La contraseña no puede contener "${p}"`);
    });
  }

  // Nombre del usuario en la contraseña
  if (password && nombre && password.toLowerCase().includes(nombre.toLowerCase())) {
    errores.push('La contraseña no puede contener tu nombre');
  }

  // Contraseñas coinciden
  if (password !== repetirPassword) errores.push('Las contraseñas no coinciden');

  if (errores.length > 0) {
    return res.render('auth/registro', { errores });
  }

  res.redirect('/auth/login');
};

module.exports = { mostrarLogin, mostrarRegistro, procesarRegistro };