const express = require('express');
const router = express.Router();

// Import specific routes
const crudRoutes = require('./crudRoutes');
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const contactRoutes = require('./contactRoutes');

// Mount routes
router.use('/crud', crudRoutes);
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/contacts', contactRoutes);

module.exports = router;
