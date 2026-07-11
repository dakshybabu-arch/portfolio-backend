const express = require('express');
const router = express.Router();
const { contactController } = require('../controllers/specificControllers');

// Contact routes
router.post('/', contactController.create);
router.get('/', contactController.getAll);
router.get('/:id', contactController.getById);
router.delete('/:id', contactController.delete);

module.exports = router;
