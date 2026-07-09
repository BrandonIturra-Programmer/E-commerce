const db = require('../../db/database');

// Columnas base que usamos en todos los SELECT
const SELECT_PRODUCTO = `
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
`;

const getAll = () => {
  return db.prepare(`${SELECT_PRODUCTO}`).all();
};

const getById = (id) => {
  return db.prepare(`${SELECT_PRODUCTO} WHERE p.id = ?`).get(id);
};

const getByCategoria = (categoria) => {
  return db.prepare(`${SELECT_PRODUCTO} WHERE c.nombre = ?`).all(categoria);
};

const getDestacados = () => {
  return db.prepare(`${SELECT_PRODUCTO} WHERE p.destacado = 1`).all();
};

const getMasPedidos = () => {
  return db.prepare(`${SELECT_PRODUCTO} WHERE p.masPedido = 1`).all();
};

const buscar = (query) => {
  return db.prepare(`${SELECT_PRODUCTO} WHERE p.nombre LIKE ?`).all(`%${query}%`);
};

module.exports = { getAll, getById, getByCategoria, getDestacados, getMasPedidos, buscar };