const usuarioModel = require('../models/usuarios');

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioModel.obtenerUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const usuario = await usuarioModel.obtenerUsuarioPorId(id);

    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuario' });
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
};