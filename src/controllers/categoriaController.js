const categoriesService = require('../services/categoriesService');
const db = require('../../db/database');

// ─── GET /categorias ───────────────────────────────────────────────────────────
const listarCategorias = (req, res) => {
  try {
    const categorias = categoriesService.getAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
};

// ─── GET /categorias/:id ───────────────────────────────────────────────────────
const verCategoria = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    const categoria = categoriesService.getById(id);
    if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });

    // Incluimos los productos de esa categoría en la respuesta
    const productos = categoriesService.getProductosByCategoria(id);
    res.json({ ...categoria, productos });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la categoría' });
  }
};

// ─── POST /categorias ──────────────────────────────────────────────────────────
const crearCategoria = (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio' });

    const resultado = db.prepare(`
      INSERT INTO categories (nombre) VALUES (?)
    `).run(nombre);

    const nueva = categoriesService.getById(resultado.lastInsertRowid);
    res.status(201).json(nueva);
  } catch (error) {
    if (error.message.includes('UNIQUE')) {
      return res.status(400).json({ error: 'Ya existe una categoría con ese nombre' });
    }
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
};

// ─── PUT /categorias/:id ───────────────────────────────────────────────────────
const modificarCategoria = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    const categoria = categoriesService.getById(id);
    if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });

    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio' });

    db.prepare('UPDATE categories SET nombre = ? WHERE id = ?').run(nombre, id);

    const actualizada = categoriesService.getById(id);
    res.json(actualizada);
  } catch (error) {
    if (error.message.includes('UNIQUE')) {
      return res.status(400).json({ error: 'Ya existe una categoría con ese nombre' });
    }
    res.status(500).json({ error: 'Error al modificar la categoría' });
  }
};

// ─── DELETE /categorias/:id ────────────────────────────────────────────────────
const eliminarCategoria = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    const categoria = categoriesService.getById(id);
    if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });

    // Verificamos que no tenga productos asociados antes de eliminar
    const productos = categoriesService.getProductosByCategoria(id);
    if (productos.length > 0) {
      return res.status(400).json({
        error: `No se puede eliminar la categoría "${categoria.nombre}" porque tiene ${productos.length} producto/s asociado/s`
      });
    }

    db.prepare('DELETE FROM categories WHERE id = ?').run(id);
    res.json({ mensaje: `Categoría "${categoria.nombre}" eliminada correctamente` });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
};

module.exports = { listarCategorias, verCategoria, crearCategoria, modificarCategoria, eliminarCategoria };