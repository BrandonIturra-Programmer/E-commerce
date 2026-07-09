const productosService = require('../services/productsService');
const db = require('../../db/database');

// ─── GET /productos ────────────────────────────────────────────────────────────
const listarProductos = (req, res) => {
  try {
    let productos = productosService.getAll();

    const { sort } = req.query;
    if (sort === 'asc') {
      productos = productos.slice().sort((a, b) => a.precio - b.precio);
    } else if (sort === 'desc') {
      productos = productos.slice().sort((a, b) => b.precio - a.precio);
    }

    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// ─── GET /productos/:id ────────────────────────────────────────────────────────
const verDetalle = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    const producto = productosService.getById(id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

// ─── POST /productos ───────────────────────────────────────────────────────────
const crearProducto = (req, res) => {
  try {
    const { nombre, precio, descripcion, imagen, categoria_id, stock, destacado, masPedido } = req.body;

    if (!nombre || !precio || !categoria_id) {
      return res.status(400).json({ error: 'nombre, precio y categoria_id son obligatorios' });
    }

    const resultado = db.prepare(`
      INSERT INTO products (nombre, precio, descripcion, imagen, categoria_id, stock, destacado, masPedido)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      nombre,
      precio,
      descripcion || null,
      imagen || null,
      categoria_id,
      stock || 0,
      destacado || 0,
      masPedido || 0
    );

    const nuevo = productosService.getById(resultado.lastInsertRowid);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// ─── PUT /productos/:id ────────────────────────────────────────────────────────
const modificarProducto = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    const producto = productosService.getById(id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    const { nombre, precio, descripcion, imagen, categoria_id, stock, destacado, masPedido } = req.body;

    db.prepare(`
      UPDATE products
      SET nombre = ?, precio = ?, descripcion = ?, imagen = ?, categoria_id = ?, stock = ?, destacado = ?, masPedido = ?
      WHERE id = ?
    `).run(
      nombre       ?? producto.nombre,
      precio       ?? producto.precio,
      descripcion  ?? producto.descripcion,
      imagen       ?? producto.imagen,
      categoria_id ?? producto.categoria_id,
      stock        ?? producto.stock,
      destacado    ?? producto.destacado,
      masPedido    ?? producto.masPedido,
      id
    );

    const actualizado = productosService.getById(id);
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al modificar el producto' });
  }
};

// ─── DELETE /productos/:id ─────────────────────────────────────────────────────
const eliminarProducto = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    const producto = productosService.getById(id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    db.prepare('DELETE FROM products WHERE id = ?').run(id);
    res.json({ mensaje: `Producto "${producto.nombre}" eliminado correctamente` });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

// ─── GET /productos/buscar?query= ─────────────────────────────────────────────
const buscarProductos = (req, res) => {
  try {
    const query = req.query.query || '';
    const productos = productosService.buscar(query);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar productos' });
  }
};

module.exports = { listarProductos, verDetalle, crearProducto, modificarProducto, eliminarProducto, buscarProductos };