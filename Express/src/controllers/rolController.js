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

// Crear un nuevo rol
const crearRol = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const nuevoRol = await rolModel.crearRol(nombre, descripcion);
    res.status(201).json(nuevoRol);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear rol' });
  }
};

// Actualizar un rol por ID
const actualizarRol = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, descripcion } = req.body;
    const rolActualizado = await rolModel.actualizarRol(id, nombre, descripcion);

    if (rolActualizado) {
      res.json(rolActualizado);
    } else {
      res.status(404).json({ mensaje: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar rol' });
  }
};

// Eliminar un rol por ID
const eliminarRol = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const rolEliminado = await rolModel.eliminarRol(id);

    if (rolEliminado) {
      res.json({ mensaje: 'Rol eliminado correctamente' });
    } else {
      res.status(404).json({ mensaje: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar rol' });
  }
};

module.exports = {
  obtenerRoles,
  obtenerRolPorId,
  crearRol,
  actualizarRol,
  eliminarRol,
};