import React, { useState, useEffect } from 'react';
import { getRoles } from '../../api/roles';
import RolForm from './RolForm';  // Importa el formulario reutilizable

const RolCrear = ({ onSubmit }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const rolesData = await getRoles();
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los roles:', error);
                setError('No se pudieron cargar los roles.');
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

    const handleSubmit = (rolData) => {
        onSubmit(rolData); // Pasa el objeto rolData
    };

    return (
        <div>
            <h2>Crear Rol</h2>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <RolForm 
                    rol={{ nombre: '', descripcion: '' }}  // Valores vacíos para crear
                    onSubmit={handleSubmit}
                    buttonText="Crear Rol"
                />
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default RolCrear;
