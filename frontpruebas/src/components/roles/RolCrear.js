import React, { useState } from 'react';
import { createRol } from '../../api/roles'; // Importamos la función para crear roles
import { useNavigate } from 'react-router-dom';

const RolCrear = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const rolData = {
            nombre,
            descripcion,
        };

        try {
            const nuevoRol = await createRol(rolData);
            console.log('Rol creado:', nuevoRol);
            navigate('/roles'); // Redirigimos al listado de roles después de crear
        } catch (error) {
            console.error('Error al crear el rol:', error);
            setError('Hubo un problema al crear el rol.');
        }
    };

    return (
        <div>
            <h2>Crear Rol</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
                    Descripción:
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Crear Rol</button>
            </form>
        </div>
    );
};

export default RolCrear;