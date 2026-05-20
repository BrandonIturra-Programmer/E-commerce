const productos = [
  {
    id: 1,
    nombre: 'Whiskey Jack Daniels Honey 750ml',
    precio: 19900,
    descripcion: 'Un verdaderamente fabuloso licor de whisky Jack Daniels.',
    imagen: 'whiskey.jpg',
    categoria: 'Bebidas',
    stock: 10,
    destacado: true,
    masPedido: false
  },
  {
    id: 2,
    nombre: 'Coca Cola Lata 220mL Pack Original x8',
    precio: 760,
    descripcion: 'Pack de 8 latas de Coca Cola 220ml.',
    imagen: 'cocacola.jpg',
    categoria: 'Bebidas',
    stock: 50,
    destacado: false,
    masPedido: true
  },
  {
    id: 3,
    nombre: 'Camiseta de algodón premium',
    precio: 2999,
    descripcion: 'Camiseta de algodón premium.',
    imagen: 'camiseta.jpg',
    categoria: 'Indumentaria',
    stock: 20,
    destacado: true,
    masPedido: false
  },
  {
    id: 4,
    nombre: 'Zapatillas deportivas',
    precio: 15999,
    descripcion: 'Zapatillas deportivas de alta calidad.',
    imagen: 'zapatillas.jpg',
    categoria: 'Indumentaria',
    stock: 0,
    destacado: false,
    masPedido: true
  },
  {
    id: 5,
    nombre: 'Pantalón de jean clásico',
    precio: 8999,
    descripcion: 'Pantalón de jean clásico.',
    imagen: 'pantalon.jpg',
    categoria: 'Indumentaria',
    stock: 15,
    destacado: true,
    masPedido: true
  }
];

module.exports = productos;