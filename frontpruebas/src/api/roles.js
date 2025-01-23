import axios from 'axios';

export const getRoles = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/roles`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los roles:', error);
        throw error; 
    }
};

// Obtener un rol por su ID
export const getRolById = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/roles/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el rol:', error);
        throw error;
    }
};

// Crear un nuevo rol
export const createRol = async (rol) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/roles`, rol, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear el rol:', error);
        throw error;
    }
};

// Actualizar un rol existente
export const updateRol = async (id, rol) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/roles/${id}`, rol, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el rol:', error);
        throw error;
    }
};

// Eliminar un rol
export const deleteRol = async (id) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/roles/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el rol:', error);
        throw error;
    }
};
