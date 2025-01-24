const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');

// Rutas para roles
router.get('/', rolController.obtenerRoles);
router.get('/:id', rolController.obtenerRolPorId);

module.exports = router;