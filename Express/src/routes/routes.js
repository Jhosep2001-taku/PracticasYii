const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

// Ruta para obtener todos los usuarios
router.get('/usuarios', controller.obtenerUsuarios);

// Ruta para obtener un usuario por ID
router.get('/usuarios/:id', controller.obtenerUsuarioPorId);

// Ruta de ejemplo (la que ya tenías)
router.get('/', (req, res) => {
  res.json({ mensaje: '¡Hola desde el controlador!' });
});

module.exports = router;