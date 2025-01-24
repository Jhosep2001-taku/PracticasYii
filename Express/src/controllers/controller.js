// Importamos el modelo
const model = require('../models/model');

// Controlador para obtener todos los usuarios
const obtenerUsuarios = (req, res) => {
  const usuarios = model.obtenerUsuarios();
  res.json(usuarios);
};

// Controlador para obtener un usuario por ID
const obtenerUsuarioPorId = (req, res) => {
  const id = parseInt(req.params.id); // Convertimos el ID a número
  const usuario = model.obtenerUsuarioPorId(id);

  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }
};

// Exportamos los controladores
module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
};