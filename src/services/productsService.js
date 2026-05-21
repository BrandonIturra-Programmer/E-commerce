const productos = require('../models/producto');

const getAll = () => {
  return productos;
};

const getById = (id) => {
  return productos.find(p => p.id === id);
};

const getByCategoria = (categoria) => {
  return productos.filter(p => p.categoria === categoria);
};

const getDestacados = () => {
  return productos.filter(p => p.destacado === true);
};

const getMasPedidos = () => {
  return productos.filter(p => p.masPedido === true);
};

const buscar = (query) => {
  return productos.filter(p =>
    p.nombre.toLowerCase().includes(query.toLowerCase())
  );
};

module.exports = { getAll, getById, getByCategoria, getDestacados, getMasPedidos, buscar };