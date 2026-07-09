const db = require('../../db/database');

const getAll = () => {
  return db.prepare('SELECT id, name, email, created_at FROM users').all();
};

const getById = (id) => {
  return db.prepare('SELECT id, name, email, created_at FROM users WHERE id = ?').get(id);
};

module.exports = { getAll, getById };