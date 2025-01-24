import React, { useState, useEffect } from 'react';

const RolEditar = ({ rol: initialRol, onSubmit }) => {
  const [nombre, setNombre] = useState(initialRol?.nombre || '');
  const [descripcion, setDescripcion] = useState(initialRol?.descripcion || '');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialRol) {
      setNombre(initialRol.nombre);
      setDescripcion(initialRol.descripcion);
    }
  }, [initialRol]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const rolData = {
      nombre,
      descripcion,
    };

    onSubmit(rolData); // Llama a la función onSubmit proporcionada por el padre
  };

  return (
    <div>
      <h2>Editar Rol</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>
        <label>
          Descripción:
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </label>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default RolEditar;