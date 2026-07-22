const express = require('express');
const router = express.Router();

const productsApi = require('../../controllers/api/productsApiController');
const categoriesApi = require('../../controllers/api/categoriesApiController');

// ─── Productos ─────────────────────────────────────────────────────────────────
router.get('/products',        productsApi.getAll);
router.get('/products/:id',    productsApi.getById);
router.post('/products',       productsApi.create);
router.put('/products/:id',    productsApi.update);
router.delete('/products/:id', productsApi.remove);

// ─── Categorías ────────────────────────────────────────────────────────────────
router.get('/categories',        categoriesApi.getAll);
router.get('/categories/:id',    categoriesApi.getById);
router.post('/categories',       categoriesApi.create);
router.put('/categories/:id',    categoriesApi.update);
router.delete('/categories/:id', categoriesApi.remove);

// ─── Stats ─────────────────────────────────────────────────────────────────────
router.get('/stats', categoriesApi.getStats);

module.exports = router;