import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRolById, updateRol } from '../../api/roles'; // Importamos las funciones para obtener y actualizar roles

const RolEditar = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRol = async () => {
            try {
                const rol = await getRolById(id);
                setNombre(rol.nombre);
                setDescripcion(rol.descripcion);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener el rol:', error);
                setError('No se pudo cargar la información del rol.');
                setLoading(false);
            }
        };

        fetchRol();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const rolData = {
            nombre,
            descripcion,
        };

        try {
            await updateRol(id, rolData);
            navigate('/roles'); // Redirigimos al listado de roles después de editar
        } catch (error) {
            console.error('Error al actualizar el rol:', error);
            setError('Hubo un problema al actualizar el rol.');
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
            <h2>Editar Rol</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Descripción:
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default RolEditar;