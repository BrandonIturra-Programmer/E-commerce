const express = require('express');
const router = express.Router();
const { mostrarLogin, mostrarRegistro, procesarRegistro } = require('../controllers/authController');

router.get('/login', mostrarLogin);
router.get('/registro', mostrarRegistro);
router.post('/registro', procesarRegistro);

module.exports = router;