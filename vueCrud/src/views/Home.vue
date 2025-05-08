<template>
    <div class="app-container d-flex flex-column align-items-center">
        <Header />
        <div class="d-flex justify-content-between align-items-center p-4 w-100">
            <div class="text-center flex-grow-1">
                <h2>Lista de clientes</h2>
            </div>
            <div>
                <button class="btn btn-success" @click="handleNewCustomer">Registrar nuevo</button>
            </div>
        </div>

        <div class="col-8">
            <table class="table">
                <thead class="table-dark">
                    <tr>
                        <td>ID</td>
                        <td>Nombre</td>
                        <td>Curp</td>
                        <td>Fecha de nacimiento</td>
                        <td>Acciones</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cliente in clientes" :key="cliente.id">
                        <td>{{ cliente.id }}</td>
                        <td>{{ cliente.name }} {{cliente.lastName}}</td>
                        <td>{{ cliente.curp }}</td>
                        <td>{{ formatDate(cliente.birthDate) }}</td>
                        <td>
                            <div class="action-container">
                                <button class="bt  bt-warning">Editar</button>
                                <button class="bt bt-danger">Eliminar</button>
                            </div>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import { getAllUsers } from '../services/api.js';
import { formatDate } from '../utils/DateUtils.js';

export default {
    methods: {
    formatDate,
    handleNewCustomer() {
    this.$router.push('/newCustomer');
  } },
    components: {
        Header
    },
    data() {
        return {
            clientes: [],
        };
    },
    async mounted() {
        try {
            this.clientes = await getAllUsers();
        } catch (error) {
            console.error(error.message);
            alert('Error al cargar clientes: ' + error.message);
        }
    }
};
</script>