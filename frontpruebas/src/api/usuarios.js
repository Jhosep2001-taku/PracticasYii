import axios from 'axios';

export const getUsuarios = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/usuarios`);  // URL desde el .env
        return response.data;  
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error; 
    }
};

// Obtener un usuario por su ID
export const getUsuarioById = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/usuarios/${id}`);  // URL desde el .env
        return response.data;
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        throw error;
    }
};

// Crear un nuevo usuario
export const createUsuario = async (usuarioData) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/usuarios`, usuarioData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
    }
};

// Actualizar un usuario existente
export const updateUsuario = async (id, usuario) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/usuarios/${id}`, usuario, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error;
    }
};

// Eliminar un usuario
export const deleteUsuario = async (id) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/usuarios/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        throw error;
    }
};
