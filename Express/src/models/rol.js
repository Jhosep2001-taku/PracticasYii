const pool = require('../db');

// Obtener todos los roles
const obtenerRoles = async () => {
  try {
    const result = await pool.query('SELECT * FROM public.rol');
    return result.rows;
  } catch (error) {
    console.error('Error al obtener roles:', error);
    throw error;
  }
};

// Obtener un rol por ID
const obtenerRolPorId = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM public.rol WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error al obtener rol por ID:', error);
    throw error;
  }
};

module.exports = {
  obtenerRoles,
  obtenerRolPorId,
};