import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsuarioEditar = ({ usuario: initialUsuario, roles, onSubmit }) => {
  const [usuario, setUsuario] = useState(initialUsuario || {
    nombre: '',
    email: '',
    password: '',
    id_rol: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialUsuario) {
      setUsuario(initialUsuario);
    }
  }, [initialUsuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/usuarios/${usuario.id}`,
        usuario
      );
     
      onSubmit(usuario); // Llama a la función onSubmit proporcionada por el padre
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      setError('Hubo un problema al actualizar el usuario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Editar Usuario</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={usuario.password}
            onChange={handleChange}
          />
        </label>
        <label>
          Rol:
          <select
            name="id_rol"
            value={usuario.id_rol}
            onChange={handleChange}
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.nombre}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
};

export default UsuarioEditar;