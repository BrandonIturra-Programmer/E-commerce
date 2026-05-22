const db = require('./db/database');

const productos = [
  { nombre: 'Camiseta de algodón', precio: 2999, descripcion: 'Camiseta premium', imagen: 'camiseta.jpg', categoria: 'Indumentaria', stock: 10, destacado: 1 },
  { nombre: 'Zapatillas deportivas', precio: 15999, descripcion: 'Zapatillas deportivas', imagen: 'zapatillas.jpg', categoria: 'Indumentaria', stock: 5, destacado: 1 },
  { nombre: 'Auriculares Bluetooth', precio: 12999, descripcion: 'Auriculares inalámbricos', imagen: 'auriculares.jpg', categoria: 'Electrónica', stock: 8, destacado: 1 },
];

const insert = db.prepare(`
  INSERT OR IGNORE INTO products (nombre, precio, descripcion, imagen, categoria, stock, destacado)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

productos.forEach(p => {
  insert.run(p.nombre, p.precio, p.descripcion, p.imagen, p.categoria, p.stock, p.destacado);
});

console.log('✅ Productos insertados!');