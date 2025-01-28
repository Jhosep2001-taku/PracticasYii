import React from 'react';
import RolForm from './RolForm';

const RolCrear = ({ onSubmit }) => (
  <RolForm 
    rol={{ nombre: '', descripcion: '' }}  
    onSubmit={onSubmit}
    buttonText="Crear Rol"
  />
);

export default RolCrear;