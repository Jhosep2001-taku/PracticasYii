import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRolById, deleteRol } from '../../api/roles'; // Importamos las funciones para obtener y eliminar roles

const RolEliminar = () => {
    const [rol, setRol] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRol = async () => {
            try {
                const rol = await getRolById(id);
                setRol(rol);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener el rol:', error);
                setError('No se pudo cargar la información del rol.');
                setLoading(false);
            }
        };

        fetchRol();
    }, [id]);

    const handleEliminar = async () => {
        try {
            await deleteRol(id);
            navigate('/roles'); // Redirigimos al listado de roles después de eliminar
        } catch (error) {
            console.error('Error al eliminar el rol:', error);
            setError('Hubo un problema al eliminar el rol.');
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div>
            <h2>Eliminar Rol</h2>
            {rol && (
                <div>
                    <p>
                        ¿Estás seguro de que deseas eliminar el rol <strong>{rol.nombre}</strong>?
                    </p>
                    <p><strong>Descripción:</strong> {rol.descripcion}</p>
                    <div>
                        <button onClick={handleEliminar}>Eliminar</button>
                        <button onClick={() => navigate('/roles')}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RolEliminar;