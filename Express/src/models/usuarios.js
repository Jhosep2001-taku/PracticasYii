const pool = require('../db');

// Obtener todos los usuarios
const obtenerUsuarios = async () => {
  try {
    const result = await pool.query('SELECT * FROM public.usuarios');
    return result.rows;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM public.usuarios WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    throw error;
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
};