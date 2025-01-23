import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UsuarioEliminar = () => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [roles, setRoles] = useState([]);  
    const { id } = useParams(); 
    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL; 

    // Obtener los detalles del usuario
    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await axios.get(`${API_URL}/usuarios/${id}`);
                setUsuario(response.data); 
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
                setError('No se pudo cargar la información del usuario.');
                setLoading(false);
            }
        };

        const fetchRoles = async () => {
            try {
                const response = await axios.get(`${API_URL}/roles`);  // Asegúrate de que esta URL devuelva los roles
                setRoles(response.data); 
            } catch (error) {
                console.error('Error al obtener los roles:', error);
            }
        };

        fetchUsuario();
        fetchRoles();
    }, [id]);

    // Eliminar el usuario
    const handleEliminar = async () => {
        try {
            await axios.delete(`${API_URL}/usuarios/${id}`);
            navigate('/usuarios'); // Redirigimos al listado de usuarios después de eliminar
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            setError('Hubo un problema al eliminar el usuario.');
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // Buscar el nombre del rol
    const rolNombre = roles.find(rol => rol.id === usuario.id_rol)?.nombre;

    return (
        <div>
            <h2>Eliminar Usuario</h2>
            {usuario && (
                <div>
                    <p>
                        ¿Estás seguro de que deseas eliminar al usuario <strong>{usuario.nombre}</strong>?
                    </p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                    <p><strong>Rol:</strong> {rolNombre || 'Desconocido'}</p> {/* Mostrar el nombre del rol */}
                    <div>
                        <button onClick={handleEliminar}>Eliminar</button>
                        <button onClick={() => navigate('/usuarios')}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsuarioEliminar;
