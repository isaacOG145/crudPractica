import axios from 'axios';
import { resolveTypeElements } from 'vue/compiler-sfc';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },

});

export const getAllUsers = async () => {
    try {

        const response = await api.get('/user/findAll');

        return response.data.result;

    } catch (error) {
        throw new Error(error.response?.message || 'Error al obtener los clientes');
    }
}

export const getUserById = async (id) => {

    try{
        const response = await api.get(`/user/findById/${id}`);
        return response.data.result;
    }catch(error){
        throw new Error(error.response?.message || 'No se encontro el cliente');
    }
}

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/user/saveUser', userData);
        return response.data;
    }catch (error) {
        
        if (error.response) {
            throw new Error(error.response.data.message || 'Error al registrar el cliente');
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor');
        } else {
            throw new Error('Error al configurar la petición');
        }
    }

}

export const updateUser = async (userData) => {
    try {
        const response = await api.put('/user/updateUser', userData);
        console.log(response);
        return response.data;
    }catch (error) {   
        if (error.response) {
            throw new Error(error.response.data.message || 'Error al actualizar el cliente');
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor');
        } else {
            throw new Error('Error al configurar la petición');
        }
    }
}


export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/user/deleteUser/${id}`);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.message || 'Error al eliminar al cliente');
    }

}

export default api;
