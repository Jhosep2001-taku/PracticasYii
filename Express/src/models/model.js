// Datos de ejemplo (simulando una base de datos)
const usuarios = [
    { id: 1, nombre: 'Juan', edad: 25 },
    { id: 2, nombre: 'Ana', edad: 30 },
    { id: 3, nombre: 'Carlos', edad: 28 },
  ];
  
  // Función para obtener todos los usuarios
  const obtenerUsuarios = () => {
    return usuarios;
  };
  
  // Función para obtener un usuario por ID
  const obtenerUsuarioPorId = (id) => {
    return usuarios.find((usuario) => usuario.id === id);
  };
  
  // Exportamos las funciones
  module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
  };