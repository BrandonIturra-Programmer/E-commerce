const productosService = require('../services/productsService');
const db = require('../../db/database');

// US5 - Normalización de IDs con DB
const normalizeId = (id) => {
  const parsed = parseInt(id);
  if (isNaN(parsed)) return null;

  const existe = db.prepare('SELECT id FROM products WHERE id = ?').get(parsed);
  if (!existe) return null;

  return parsed;
};

const listarProductos = (req, res) => {
  let productos = productosService.getAll();

  const sort = req.query.sort;
  if (sort === 'asc') {
    productos = productos.slice().sort((a, b) => a.precio - b.precio);
  } else if (sort === 'desc') {
    productos = productos.slice().sort((a, b) => b.precio - a.precio);
  }

  res.render('productos/lista', { productos, sort });
};

const verDetalle = (req, res) => {
  const id = normalizeId(req.params.id);

  if (id === null) {
    return res.status(404).render('404');
  }

  const producto = productosService.getById(id);
  const relacionados = productosService.getByCategoria(producto.categoria)
    .filter(p => p.id !== producto.id)
    .slice(0, 4);

  res.render('productos/detalle', { producto, relacionados });
};

const listarPorCategoria = (req, res) => {
  const categoria = req.params.categoria;
  const productos = productosService.getByCategoria(categoria);
  res.render('productos/categoria', { productos, categoria });
};

const buscarProductos = (req, res) => {
  const query = req.query.query || '';
  const productos = productosService.buscar(query);
  res.render('productos/busqueda', { productos, query });
};

module.exports = { listarProductos, verDetalle, listarPorCategoria, buscarProductos };