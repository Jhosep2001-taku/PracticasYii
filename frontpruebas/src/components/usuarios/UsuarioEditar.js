import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateUsuario } from '../../api/usuarios';  // Importar la función de la API

export const API_ROLES_URL = `${process.env.REACT_APP_API_URL}/roles`;

const UsuarioEditar = () => {
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        id_rol: 1,
    });
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams(); // Obtenemos el id del usuario de la URL
    const navigate = useNavigate();

    // Obtener los roles disponibles y los datos del usuario
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get(API_ROLES_URL);
                setRoles(response.data); // Establecemos los roles
            } catch (error) {
                console.error('Error al obtener los roles:', error);
                setError('No se pudieron cargar los roles.');
            }
        };

        const fetchUsuario = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/usuarios/${id}`);
                setUsuario(response.data); // Cargamos los datos del usuario
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
                setError('No se pudo cargar la información del usuario.');
                setLoading(false);
            }
        };

        fetchRoles(); // Llamada para obtener los roles
        fetchUsuario(); // Llamada para obtener los datos del usuario
    }, [id]);  // Dependemos del id para realizar las consultas

    // Manejo del submit del formulario para actualizar el usuario
    const handleSubmit = async (e) => {
        e.preventDefault();

        const usuarioData = {
            nombre: usuario.nombre,
            email: usuario.email,
            password: usuario.password,
            id_rol: usuario.id_rol,
        };

        try {
            await updateUsuario(id, usuarioData);  // Llamada a la API para actualizar el usuario
            navigate('/usuarios'); // Redirigimos al listado de usuarios
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            setError('Hubo un problema al actualizar el usuario.');
        }
    };

    // Mostrar cargando o error si corresponde
    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // Renderizar formulario para editar usuario
    return (
        <div>
            <h2>Editar Usuario</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        value={usuario.nombre}
                        onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={usuario.email}
                        onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                        required
                    />
                </label>
                <label>
                    Contraseña:
                    <input
                        type="password"
                        value={usuario.password}
                        onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
                    />
                </label>
                <label>
                    Rol:
                    <select
                        value={usuario.id_rol}
                        onChange={(e) => setUsuario({ ...usuario, id_rol: parseInt(e.target.value) })}
                    >
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.nombre}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default UsuarioEditar;
