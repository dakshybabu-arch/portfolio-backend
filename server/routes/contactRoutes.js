const express = require('express');
const router = express.Router();
const { contactController } = require('../controllers/specificControllers');
const { contactLimiter } = require('../middleware/rateLimiter');

// Contact routes with rate limiting
router.post('/', contactLimiter, contactController.create);
router.get('/', contactController.getAll);
router.get('/:id', contactController.getById);
router.delete('/:id', contactController.delete);

module.exports = router;
