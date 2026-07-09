const express = require('express');
const router = express.Router();
const {
  listarCategorias,
  verCategoria,
  crearCategoria,
  modificarCategoria,
  eliminarCategoria
} = require('../controllers/categoriaController');

router.get('/',       listarCategorias);
router.get('/:id',    verCategoria);
router.post('/',      crearCategoria);
router.put('/:id',    modificarCategoria);
router.delete('/:id', eliminarCategoria);

module.exports = router;