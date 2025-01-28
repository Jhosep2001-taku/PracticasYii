import React from 'react';
import UsuarioForm from './UsuarioForm';

const UsuarioCrear = ({ roles, onSubmit }) => (
  <UsuarioForm roles={roles} onSubmit={onSubmit} isEditing={false} />
);

export default UsuarioCrear;