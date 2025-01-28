import React, { useEffect, useState } from 'react';
import RolForm from './RolForm';

const RolEditar = ({ rol: initialRol, onSubmit }) => {
  const [rol, setRol] = useState(initialRol);

  useEffect(() => {
    if (initialRol) {
      setRol(initialRol);
    }
  }, [initialRol]);

  return (
    <RolForm rol={rol} onSubmit={onSubmit} isEditing={true} />
  );
};

export default RolEditar;