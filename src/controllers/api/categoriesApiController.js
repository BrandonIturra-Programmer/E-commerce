const categoriesService = require('../../services/categoriesService');
const db = require('../../../db/database');

const getAll = (req, res) => {
  try {
    const categorias = categoriesService.getAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
};

const getById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    const categoria = categoriesService.getById(id);
    if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });

    const productos = categoriesService.getProductosByCategoria(id);
    res.json({ ...categoria, productos });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la categoría' });
  }
};

const create = (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio' });

    const resultado = db.prepare('INSERT INTO categories (nombre) VALUES (?)').run(nombre);
    const nueva = categoriesService.getById(resultado.lastInsertRowid);
    res.status(201).json(nueva);
  } catch (error) {
    if (error.message.includes('UNIQUE')) {
      return res.status(400).json({ error: 'Ya existe una categoría con ese nombre' });
    }
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
};

const update = (req, res) => {
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

const remove = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    const categoria = categoriesService.getById(id);
    if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });

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

const getStats = (req, res) => {
  try {
    const totalProducts = db.prepare('SELECT COUNT(*) as total FROM products').get().total;
    const totalCategories = db.prepare('SELECT COUNT(*) as total FROM categories').get().total;
    res.json({ totalProducts, totalCategories });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
};

module.exports = { getAll, getById, create, update, remove, getStats };