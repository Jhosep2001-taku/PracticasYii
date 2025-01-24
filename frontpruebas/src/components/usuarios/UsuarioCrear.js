import React, { useState } from 'react';

const UsuarioCrear = ({ roles, onSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [idRol, setIdRol] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarioData = {
      nombre,
      email,
      password,
      id_rol: idRol,
    };

    onSubmit(usuarioData); // Llama a la función onSubmit proporcionada por el padre
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          autoComplete="off"
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="off"
        />
      </label>
      <label>
        Contraseña:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
      </label>
      <label>
        Rol:
        <select
          value={idRol}
          onChange={(e) => setIdRol(parseInt(e.target.value))}
        >
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.nombre}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Crear Usuario</button>
    </form>
  );
};

export default UsuarioCrear;