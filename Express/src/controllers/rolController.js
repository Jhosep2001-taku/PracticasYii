const rolModel = require('../models/rol');

// Obtener todos los roles
const obtenerRoles = async (req, res) => {
  try {
    const roles = await rolModel.obtenerRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener roles' });
  }
};

// Obtener un rol por ID
const obtenerRolPorId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const rol = await rolModel.obtenerRolPorId(id);

    if (rol) {
      res.json(rol);
    } else {
      res.status(404).json({ mensaje: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener rol' });
  }
};

module.exports = {
  obtenerRoles,
  obtenerRolPorId,
};