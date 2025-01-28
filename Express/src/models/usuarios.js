const pool = require('../db');

// Función para formatear la fecha
const formatearFecha = (fecha) => {
  return new Date(fecha).toISOString().replace('T', ' ').replace('Z', '').split('.')[0];
};

// Obtener todos los usuarios
const obtenerUsuarios = async () => {
  try {
    const result = await pool.query('SELECT * FROM public.usuarios');
    const usuarios = result.rows.map((usuario) => ({
      ...usuario,
      fecha_creacion: formatearFecha(usuario.fecha_creacion),
    }));
    return usuarios;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM public.usuarios WHERE id = $1', [id]);
    if (result.rows[0]) {
      const usuario = {
        ...result.rows[0],
        fecha_creacion: formatearFecha(result.rows[0].fecha_creacion),
      };
      return usuario;
    }
    return null;
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    throw error;
  }
};

// Crear un nuevo usuario
const crearUsuario = async (nombre, email, password, id_rol) => {
  try {
    const result = await pool.query(
      'INSERT INTO public.usuarios (nombre, email, password, id_rol) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, email, password, id_rol]
    );
    const usuario = {
      ...result.rows[0],
      fecha_creacion: formatearFecha(result.rows[0].fecha_creacion),
    };
    return usuario;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

// Actualizar un usuario por ID
const actualizarUsuario = async (id, nombre, email, password, id_rol) => {
  try {
    let query;
    let params;

    if (password) {
      // Si se proporciona password, actualizar todos los campos
      query = `
        UPDATE public.usuarios 
        SET nombre = $1, email = $2, password = $3, id_rol = $4 
        WHERE id = $5 
        RETURNING *
      `;
      params = [nombre, email, password, id_rol, id];
    } else {
      // Si no se proporciona password, actualizar todo excepto el password
      query = `
        UPDATE public.usuarios 
        SET nombre = $1, email = $2, id_rol = $3 
        WHERE id = $4 
        RETURNING *
      `;
      params = [nombre, email, id_rol, id];
    }

    const result = await pool.query(query, params);

    if (result.rows[0]) {
      return {
        ...result.rows[0],
        fecha_creacion: formatearFecha(result.rows[0].fecha_creacion),
      };
    }
    return null;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};

// Eliminar un usuario por ID
const eliminarUsuario = async (id) => {
  try {
    const result = await pool.query('DELETE FROM public.usuarios WHERE id = $1 RETURNING *', [id]);
    if (result.rows[0]) {
      const usuario = {
        ...result.rows[0],
        fecha_creacion: formatearFecha(result.rows[0].fecha_creacion),
      };
      return usuario;
    }
    return null;
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error;
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};