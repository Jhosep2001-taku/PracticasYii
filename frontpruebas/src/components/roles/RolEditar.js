import React, { useState, useEffect } from 'react';
import RolForm from './RolForm';  // Importa el formulario reutilizable

const RolEditar = ({ rol: initialRol, onSubmit }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialRol) {
      // Ya se manejan los valores iniciales en RolForm
    }
  }, [initialRol]);

  const handleSubmit = (rolData) => {
    onSubmit(rolData); // Pasa el objeto rolData
  };

  return (
    <div>
      <h2>Editar Rol</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <RolForm 
        rol={initialRol}   
        onSubmit={handleSubmit}
        buttonText="Guardar Cambios"
      />
    </div>
  );
};

export default RolEditar;
