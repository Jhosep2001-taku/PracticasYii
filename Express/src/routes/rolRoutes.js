const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');

// Rutas para roles
router.get('/', rolController.obtenerRoles); // Obtener todos los roles
router.get('/:id', rolController.obtenerRolPorId); // Obtener un rol por ID
router.post('/', rolController.crearRol); // Crear un nuevo rol
router.put('/:id', rolController.actualizarRol); // Actualizar un rol por ID
router.delete('/:id', rolController.eliminarRol); // Eliminar un rol por ID

module.exports = router;