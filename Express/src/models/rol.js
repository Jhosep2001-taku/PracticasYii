const pool = require('../db');

// Función para formatear la fecha
const formatearFecha = (fecha) => {
  return new Date(fecha).toISOString().replace('T', ' ').replace('Z', '').split('.')[0];
};

// Obtener todos los roles
const obtenerRoles = async () => {
  try {
    const result = await pool.query('SELECT * FROM public.rol');
    const roles = result.rows.map((rol) => ({
      ...rol,
      fecha_creacion: formatearFecha(rol.fecha_creacion),
    }));
    return roles;
  } catch (error) {
    console.error('Error al obtener roles:', error);
    throw error;
  }
};

// Obtener un rol por ID
const obtenerRolPorId = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM public.rol WHERE id = $1', [id]);
    if (result.rows[0]) {
      const rol = {
        ...result.rows[0],
        fecha_creacion: formatearFecha(result.rows[0].fecha_creacion),
      };
      return rol;
    }
    return null;
  } catch (error) {
    console.error('Error al obtener rol por ID:', error);
    throw error;
  }
};

// Crear un nuevo rol
const crearRol = async (nombre, descripcion) => {
  try {
    const result = await pool.query(
      'INSERT INTO public.rol (nombre, descripcion) VALUES ($1, $2) RETURNING *',
      [nombre, descripcion]
    );
    const rol = {
      ...result.rows[0],
      fecha_creacion: formatearFecha(result.rows[0].fecha_creacion),
    };
    return rol;
  } catch (error) {
    console.error('Error al crear rol:', error);
    throw error;
  }
};

// Actualizar un rol por ID
const actualizarRol = async (id, nombre, descripcion) => {
  try {
    const result = await pool.query(
      'UPDATE public.rol SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *',
      [nombre, descripcion, id]
    );
    if (result.rows[0]) {
      const rol = {
        ...result.rows[0],
        fecha_creacion: formatearFecha(result.rows[0].fecha_creacion),
      };
      return rol;
    }
    return null;
  } catch (error) {
    console.error('Error al actualizar rol:', error);
    throw error;
  }
};

// Eliminar un rol por ID
const eliminarRol = async (id) => {
  try {
    const result = await pool.query('DELETE FROM public.rol WHERE id = $1 RETURNING *', [id]);
    if (result.rows[0]) {
      const rol = {
        ...result.rows[0],
        fecha_creacion: formatearFecha(result.rows[0].fecha_creacion),
      };
      return rol;
    }
    return null;
  } catch (error) {
    console.error('Error al eliminar rol:', error);
    throw error;
  }
};

module.exports = {
  obtenerRoles,
  obtenerRolPorId,
  crearRol,
  actualizarRol,
  eliminarRol,
};