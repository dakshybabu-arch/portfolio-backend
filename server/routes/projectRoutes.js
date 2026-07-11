const express = require('express');
const router = express.Router();
const { projectController } = require('../controllers/specificControllers');

// Project routes
router.post('/', projectController.create);
router.get('/', projectController.getAll);
router.get('/:id', projectController.getById);
router.put('/:id', projectController.update);
router.delete('/:id', projectController.delete);

module.exports = router;
