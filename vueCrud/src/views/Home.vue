<template>
    <div class="app-container d-flex flex-column align-items-center">
        <Header />
        <div class="d-flex justify-content-between align-items-center p-4 w-100">
            <div class="text-center flex-grow-1">
                <h2>Lista de clientes</h2>
            </div>
            <div>
                <button class="btn btn-success" @click="handleNewCustomer">
                    <i class="bi bi-person-plus"></i>
                    Registrar nuevo
                </button>
            </div>
        </div>

        <div class="col-8">
            <table class="table shadow-sm">
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
                        <td>{{ cliente.name }} {{ cliente.lastName }}</td>
                        <td>{{ cliente.curp }}</td>
                        <td>{{ formatDate(cliente.birthDate) }}</td>
                        <td>
                            <div class="action-container">
                                <button class="bt  bt-warning" @click="handleEditCustomer(cliente)">
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
</template>

<script>
import Header from '../components/Header.vue';
import { getAllUsers, deleteUser } from '../services/api.js';
import { formatDate } from '../utils/DateUtils.js';
import Swal from 'sweetalert2';

export default {
    methods: {
        formatDate,
        handleEditCustomer(cliente) {
            this.$router.push({
                path: '/updateCustomer',
                query: {
                    id: cliente.id,
                    name: cliente.name,
                    lastName: cliente.lastName,
                    curp: cliente.curp,
                    birthDate: cliente.birthDate
                }
            });
        },
        handleNewCustomer() {
            this.$router.push('/newCustomer');
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
    components: {
        Header
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