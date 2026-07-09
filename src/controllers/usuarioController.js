const usersService = require('../services/usersService');
const db = require('../../db/database');

// ─── GET /usuarios ─────────────────────────────────────────────────────────────
const listarUsuarios = (req, res) => {
  try {
    const usuarios = usersService.getAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// ─── GET /usuarios/:id ─────────────────────────────────────────────────────────
const verUsuario = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    const usuario = usersService.getById(id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// ─── POST /usuarios ────────────────────────────────────────────────────────────
const crearUsuario = (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email y password son obligatorios' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'El email no es válido' });
    }

    const resultado = db.prepare(`
      INSERT INTO users (name, email, password_hash)
      VALUES (?, ?, ?)
    `).run(name, email, password);

    const nuevo = usersService.getById(resultado.lastInsertRowid);
    res.status(201).json(nuevo);
  } catch (error) {
    if (error.message.includes('UNIQUE')) {
      return res.status(400).json({ error: 'Ya existe un usuario con ese email' });
    }
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

// ─── PUT /usuarios/:id ─────────────────────────────────────────────────────────
const modificarUsuario = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    const usuario = usersService.getById(id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const { name, email, password } = req.body;

    db.prepare(`
      UPDATE users
      SET name = ?, email = ?, password_hash = ?
      WHERE id = ?
    `).run(
      name     ?? usuario.name,
      email    ?? usuario.email,
      password ?? usuario.password_hash,
      id
    );

    const actualizado = usersService.getById(id);
    res.json(actualizado);
  } catch (error) {
    if (error.message.includes('UNIQUE')) {
      return res.status(400).json({ error: 'Ya existe un usuario con ese email' });
    }
    res.status(500).json({ error: 'Error al modificar el usuario' });
  }
};

// ─── DELETE /usuarios/:id ──────────────────────────────────────────────────────
const eliminarUsuario = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    const usuario = usersService.getById(id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    db.prepare('DELETE FROM users WHERE id = ?').run(id);
    res.json({ mensaje: `Usuario "${usuario.name}" eliminado correctamente` });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

module.exports = { listarUsuarios, verUsuario, crearUsuario, modificarUsuario, eliminarUsuario };