import React, { useState, useEffect } from 'react';
import { createUsuario } from '../../api/usuarios';
import axios from 'axios';
// Definir la URL de la API de roles
export const API_ROLES_URL = `${process.env.REACT_APP_API_URL}/roles`; // Suponiendo que usas una URL base del .env


const UsuarioCrear = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [idRol, setIdRol] = useState(1);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Obtener los roles disponibles
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get(API_ROLES_URL);
                setRoles(response.data);  // Guardamos los roles en el estado
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los roles:', error);
            }
        };

        fetchRoles();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const usuarioData = {
            nombre,
            email,
            password,
            id_rol: idRol
        };

        try {
            const nuevoUsuario = await createUsuario(usuarioData);
            console.log('Usuario creado:', nuevoUsuario);
            // Puedes agregar una lógica para redirigir al usuario o mostrar un mensaje de éxito.
        } catch (error) {
            console.error('Error al crear el usuario:', error);
        }
    };

    return (
        <div>
            <h2>Crear Usuario</h2>
            {loading ? (
                <p>Cargando roles...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>
                        Nombre:
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            autoComplete="off"  // Desactivar autocompletar
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="off"  // Desactivar autocompletar
                        />
                    </label>
                    <label>
                        Contraseña:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="new-password"  // Desactivar autocompletar de la contraseña
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
            )}
        </div>
    );
};

export default UsuarioCrear;
