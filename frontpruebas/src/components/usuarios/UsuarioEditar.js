import React, { useEffect, useState } from 'react';
import UsuarioForm from './UsuarioForm';

const UsuarioEditar = ({ usuario: initialUsuario, roles, onSubmit }) => {
  const [usuario, setUsuario] = useState(initialUsuario);

  useEffect(() => {
    if (initialUsuario) {
      setUsuario(initialUsuario);
    }
  }, [initialUsuario]);

  return (
    <UsuarioForm usuario={usuario} roles={roles} onSubmit={onSubmit} isEditing={true} />
  );
};

export default UsuarioEditar;