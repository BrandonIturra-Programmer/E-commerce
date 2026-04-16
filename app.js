const express = require('express');
const path = require('path');
const app = express();

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static('public'));

// Rutas
const productosRouter = require('./routes/productos');
app.use('/productos', productosRouter);

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

const homeRouter = require('./routes/home');
app.use('/home', homeRouter);

const carritoRouter = require('./routes/carrito');
app.use('/carrito', carritoRouter);

// Ruta principal
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

// Servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});