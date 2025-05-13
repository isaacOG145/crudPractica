<template>
    <div class="clientes-list-container">
        <div class="row justify-content-center">
            <div class="d-flex justify-content-between py-4 col-10">
                <div>
                    <Search />
                </div>
                <div v-if="showNewButton">
                    <button class="bt bt-success" @click="handleNewCustomer">
                        <i class="bi bi-person-plus"></i>
                        Registrar nuevo
                    </button>
                </div>
            </div>
        </div>

        <div class="row justify-content-center">
            <div class="col-10">
                <table class="customer-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Curp</th>
                            <th>Fecha de nacimiento</th>
                            <th v-if="showActions">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cliente in clientes" :key="cliente.id">
                            <td>{{ cliente.id }}</td>
                            <td>{{ cliente.name }} {{ cliente.lastName }}</td>
                            <td>{{ cliente.curp }}</td>
                            <td>{{ formatDate(cliente.birthDate) }}</td>
                            <td v-if="showActions">
                                <div class="action-container">
                                    <button class="bt bt-warning" @click="handleEditCustomer(cliente)">
                                        <i class="bi bi-pencil-square"></i>
                                    </button>
                                    <button class="bt bt-danger" @click="deleteCustomer(cliente)">
                                        <i class="bi bi-trash3"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>

<script>
import Search from '../components/Search.vue';
import { getAllUsers, deleteUser } from '../services/api.js';
import { formatDate } from '../utils/DateUtils.js';
import Swal from 'sweetalert2';

export default {
    name: 'ClientesList',
    props: {
        showNewButton: {
            type: Boolean,
            default: true
        },
        showActions: {
            type: Boolean,
            default: true
        }
    },
    components: {
        Search
    },
    methods: {
        formatDate,
        handleEditCustomer(cliente) {
            this.$emit('edit-customer', cliente);
        },
        handleNewCustomer() {
            this.$emit('new-customer');
        },
        async deleteCustomer(cliente) {
            try {
                const result = await Swal.fire({
                    icon: 'question',
                    title: 'Eliminar cliente',
                    text: '¿Seguro que quieres eliminar este cliente?',
                    showCancelButton: true,
                    confirmButtonColor: "#10a219",
                    cancelButtonColor: "#dc3545",
                    confirmButtonText: "Si",
                    cancelButtonText: "Cancelar"
                });

                if (result.isConfirmed) {
                    await deleteUser(cliente.id);

                    await Swal.fire({
                        icon: 'success',
                        title: 'Cliente eliminado',
                        text: 'El cliente ha sido eliminado correctamente',
                        confirmButtonColor: "#10a219"
                    });

                    this.$emit('customer-deleted');
                    await this.loadCustomers();
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message || 'No se pudo eliminar el cliente',
                    confirmButtonColor: "#dc3545"
                });
            }
        },
        async loadCustomers() {
            try {
                this.clientes = await getAllUsers();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al cargar clientes: ' + error.message,
                    confirmButtonColor: "#dc3545"
                });
            }
        }
    },
    data() {
        return {
            clientes: [],
        };
    },
    async mounted() {
        await this.loadCustomers();
    }
};
</script>

<style scoped>
.clientes-list-container {
    width: 100%;
}
</style>