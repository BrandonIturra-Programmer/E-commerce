const express = require('express');
const path = require('path');
const app = express();

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Archivos estáticos
app.use(express.static('public'));

// Body 
app.use(express.urlencoded({ extended: true }));

// Rutas
const productosRouter = require('./src/routes/productos');
const authRouter = require('./src/routes/auth');
const homeRouter = require('./src/routes/home');
const carritoRouter = require('./src/routes/carrito');

app.use('/productos', productosRouter);
app.use('/auth', authRouter);
app.use('/home', homeRouter);
app.use('/carrito', carritoRouter);

// Ruta principal
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

// Servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});