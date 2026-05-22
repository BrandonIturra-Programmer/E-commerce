const db = require('../../db/database');

const getAll = () => {
  return db.prepare('SELECT * FROM products').all();
};

const getById = (id) => {
  return db.prepare('SELECT * FROM products WHERE id = ?').get(id);
};

const getByCategoria = (categoria) => {
  return db.prepare('SELECT * FROM products WHERE categoria = ?').all(categoria);
};

const getDestacados = () => {
  return db.prepare('SELECT * FROM products WHERE destacado = 1').all();
};

const getMasPedidos = () => {
  return db.prepare('SELECT * FROM products WHERE masPedido = 1').all();
};

const buscar = (query) => {
  return db.prepare('SELECT * FROM products WHERE nombre LIKE ?').all(`%${query}%`);
};

module.exports = { getAll, getById, getByCategoria, getDestacados, getMasPedidos, buscar };