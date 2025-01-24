const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rutas para usuarios
router.get('/', usuarioController.obtenerUsuarios); // Obtener todos los usuarios
router.get('/:id', usuarioController.obtenerUsuarioPorId); // Obtener un usuario por ID
router.post('/', usuarioController.crearUsuario); // Crear un nuevo usuario
router.put('/:id', usuarioController.actualizarUsuario); // Actualizar un usuario por ID
router.delete('/:id', usuarioController.eliminarUsuario); // Eliminar un usuario por ID

module.exports = router;