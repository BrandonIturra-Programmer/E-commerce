const express = require('express');
const router = express.Router();
const { mostrarLogin, mostrarRegistro } = require('../controllers/authController');

router.get('/login', mostrarLogin);
router.get('/registro', mostrarRegistro);

module.exports = router;