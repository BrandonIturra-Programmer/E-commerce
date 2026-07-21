const db = require('../../db/database');

const getAll = () => {
  return db.prepare(`
    SELECT 
      c.id,
      c.nombre,
      COUNT(p.id) AS cantidadProductos
    FROM categories c
    LEFT JOIN products p ON p.categoria_id = c.id
    GROUP BY c.id
  `).all();
};

const getById = (id) => {
  return db.prepare('SELECT * FROM categories WHERE id = ?').get(id);
};

const getProductosByCategoria = (id) => {
  return db.prepare(`
    SELECT 
      p.id,
      p.nombre,
      p.precio,
      p.descripcion,
      p.imagen,
      p.stock,
      p.destacado,
      p.masPedido,
      p.categoria_id,
      c.nombre AS categoria
    FROM products p
    LEFT JOIN categories c ON p.categoria_id = c.id
    WHERE p.categoria_id = ?
  `).all(id);
};

module.exports = { getAll, getById, getProductosByCategoria };