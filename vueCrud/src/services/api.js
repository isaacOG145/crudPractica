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

export const registerUser = async (userData) => {
    try {

        const response = await api.post('/user/saveUser', userData);

        if (response.data.type != "SUCCESS") {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        throw new Error(error.response?.message || 'Error al registrar el cliente');
    }

}

export const updateUser = async (userData) => {
    try {
        const response = await api.put('/user/updateUser', userData);
        console.log(response);

        if (response.data.type === "WARNING") {
            return response.data;
        }

        if (response.data.type !== "SUCCESS") {
            throw new Error(response.data.message);
        }

        return response.data;
    } catch (error) {
        throw new Error(error.response?.message || 'Error al actualizar al cliente');
    }
}


export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/user/deleteUser/${id}`);

        if (response.data.type != "SUCCESS") {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        throw new Error(error.response?.message || 'Error al actualizar al cliente');
    }

}

export default api;
