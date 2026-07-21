const express = require('express');
const path = require('path');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const app = express();

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.set('layout', 'partials/layout');
app.use(expressLayouts);

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sesiones
app.use(session({
  secret: 'miecommerce_secret',
  resave: false,
  saveUninitialized: true
}));

const cartService = require('./src/services/cartService');

app.use((req, res, next) => {
  const carrito = cartService.getCarrito(req);
  res.locals.cantidadCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  next();
});

// Rutas
const productosRouter = require('./src/routes/productos');
const authRouter = require('./src/routes/auth');
const homeRouter = require('./src/routes/home');
const carritoRouter = require('./src/routes/carrito');
const categoriasRouter = require('./src/routes/categorias');
const usuariosRouter = require('./src/routes/usuarios');


app.use('/productos', productosRouter);
app.use('/auth', authRouter);
app.use('/home', homeRouter);
app.use('/carrito', carritoRouter);
app.use('/categorias', categoriasRouter);
app.use('/usuarios', usuariosRouter);


// Ruta principal
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

//Middleware 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500');
});

// Middleware 404
app.use((req, res) => {
  res.status(404).render('404');
});

// Servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});