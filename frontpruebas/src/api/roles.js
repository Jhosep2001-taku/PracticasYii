import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getRoles = async () => {
  try {
    const response = await apiClient.get('/roles');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los roles:', error);
    throw error;
  }
};

// Obtener un rol por su ID
export const getRolById = async (id) => {
  try { 
    const response = await apiClient.get(`/roles/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el rol:', error);
    throw error;
  }
};

// Crear un nuevo rol
export const createRol = async (rol) => {
  try {
    const response = await apiClient.post('/roles', rol);
    return response.data;
  } catch (error) {
    console.error('Error al crear el rol:', error);
    throw error;
  }
};

// Actualizar un rol existente
export const updateRol = async (id, rol) => {
  try {
    const response = await apiClient.put(`/roles/${id}`, rol);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el rol:', error);
    throw error;
  }
};

// Eliminar un rol
export const deleteRol = async (id) => {
  try {
    const response = await apiClient.delete(`/roles/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el rol:', error);
    throw error;
  }
};
