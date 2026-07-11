const express = require('express');
const router = express.Router();
const CRUDController = require('../controllers/crudController');

// Generic CRUD routes for any model
// POST /api/crud/:modelName - Create a new document
router.post('/:modelName', CRUDController.create);

// GET /api/crud/:modelName - Get all documents with pagination
router.get('/:modelName', CRUDController.getAll);

// GET /api/crud/:modelName/:id - Get single document by ID
router.get('/:modelName/:id', CRUDController.getById);

// PUT /api/crud/:modelName/:id - Update document by ID
router.put('/:modelName/:id', CRUDController.update);

// DELETE /api/crud/:modelName/:id - Delete document by ID
router.delete('/:modelName/:id', CRUDController.delete);

module.exports = router;
