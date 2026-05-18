let carrito = [
  {
    id: 1,
    nombre: 'Jack Daniel\'s Tennessee Honey 750ml',
    precio: 19900,
    cantidad: 1,
    imagen: 'whiskey.jpg'
  },
  {
    id: 2,
    nombre: '1 Combo Hamburguesa',
    precio: 5000,
    cantidad: 1,
    imagen: 'hamburguesa.jpg'
  }
];

const mostrarCarrito = (req, res) => {
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  res.render('carrito', { carrito, total });
};

module.exports = { mostrarCarrito };