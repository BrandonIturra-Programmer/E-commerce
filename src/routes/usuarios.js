const express = require('express');
const router = express.Router();
const {
  listarUsuarios,
  verUsuario,
  crearUsuario,
  modificarUsuario,
  eliminarUsuario
} = require('../controllers/usuarioController');

router.get('/',       listarUsuarios);
router.get('/:id',    verUsuario);
router.post('/',      crearUsuario);
router.put('/:id',    modificarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;