<template>
    <div class="app-container d-flex flex-column align-items-center min-vh-100">
        <Header />
        <div class="return-content my-2">
            <Button @click="handleIndex"/>
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4">
            <div class="card shadow-sm">
                <div class="card-body p-4">
                    <form @submit.prevent="handleSubmit">
                        <div class="row text-center mb-4">
                            <h2 class="card-title">Nuevo cliente</h2>
                        </div>

                        <!-- Campo Nombre -->
                        <div class="form-floating mb-3">
                            <input type="text" id="name" class="form-control" placeholder=" " v-model="form.name"
                                :class="{ 'is-invalid': errors.name }" maxlength="50" />
                            <label for="name">
                                <i class="bi bi-person-fill me-2"></i>
                                Nombre <span class="text-danger">*</span>
                            </label>
                            <span v-if="errors.name" class="invalid-feedback">
                                {{ errors.name }}
                            </span>
                        </div>

                        <!-- Campo Apellidos -->
                        <div class="form-floating mb-3">
                            <input type="text" id="lastName" class="form-control" placeholder=" "
                                v-model="form.lastName" :class="{ 'is-invalid': errors.lastName }" maxlength="50" />
                            <label for="lastName">
                                <i class="bi bi-person-fill me-2"></i>
                                Apellidos <span class="text-danger">*</span>
                            </label>
                            <span v-if="errors.lastName" class="invalid-feedback">
                                {{ errors.lastName }}
                            </span>
                        </div>

                        <!-- Campo CURP -->
                        <div class="form-floating mb-3">
                            <input type="text" id="curp" class="form-control" placeholder=" " v-model="form.curp"
                                :class="{ 'is-invalid': errors.curp }" @input="form.curp = form.curp.toUpperCase()" />
                            <label for="curp">
                                <i class="bi bi-person-rolodex me-2"></i>
                                CURP <span class="text-danger">*</span>
                            </label>
                            <span v-if="errors.curp" class="invalid-feedback">
                                {{ errors.curp }}
                            </span>
                        </div>

                        <!-- Campo Fecha de Nacimiento -->
                        <div class="form-floating mb-4">
                            <input type="date" id="birthDate" class="form-control" placeholder=" "
                                v-model="form.birthDate" :class="{ 'is-invalid': errors.birthDate }" :max="maxDate" />
                            <label for="birthDate">
                                <i class="bi bi-cake-fill me-2"></i>
                                Fecha de nacimiento <span class="text-danger">*</span>
                            </label>
                            <span v-if="errors.birthDate" class="invalid-feedback">
                                {{ errors.birthDate }}
                            </span>
                        </div>

                        <div class="d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary px-4">
                                <i class="bi bi-save me-2"></i>Registrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Header from '../components/Header.vue';
import Button from '../components/Button.vue';
import {
    validateLetters,
    validateBirthDate,
    validateCurp,
    validationMessages
} from '../utils/ValidateInputs.js';
import { registerUser } from '../services/api.js';
import Swal from 'sweetalert2';


export default {
    components: {
        Header,
        Button
    },
    data() {
        return {
            form: {
                name: '',
                lastName: '',
                curp: '',
                birthDate: ''
            },
            errors: {
                name: '',
                lastName: '',
                curp: '',
                birthDate: ''
            },
            maxDate: new Date().toISOString().split('T')[0]
        }
    },
    methods: {
        handleIndex() {
            this.$router.push('/');
        },
        validateForm() {
            let isValid = true;

            this.errors = {
                name: '',
                lastName: '',
                curp: '',
                birthDate: ''
            };

            if (!this.form.name.trim()) {
                this.errors.name = validationMessages.required;
                isValid = false;
            } else if (!validateLetters(this.form.name)) {
                this.errors.name = validationMessages.letters;
                isValid = false;
            }

            if (!this.form.lastName.trim()) {
                this.errors.lastName = validationMessages.required;
                isValid = false;
            } else if (!validateLetters(this.form.lastName)) {
                this.errors.lastName = validationMessages.letters;
                isValid = false;
            }

            if (!this.form.curp.trim()) {
                this.errors.curp = validationMessages.required;
                isValid = false;
            } else if (!validateCurp(this.form.curp)) {
                this.errors.curp = validationMessages.curp;
                isValid = false;
            }

            if (!this.form.birthDate) {
                this.errors.birthDate = validationMessages.required;
                isValid = false;
            } else if (!validateBirthDate(this.form.birthDate)) {
                this.errors.birthDate = validationMessages.birthDate;
                isValid = false;
            }

            return isValid;
        },
        async handleSubmit() {
    try {
        if (this.validateForm()) {
            const loadingAlert = Swal.fire({  
                title: 'Registrando cliente',
                html: 'Por favor espera...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading(); 
                }
            });

            const userData = {
                name: this.form.name.trim(),
                lastName: this.form.lastName.trim(),
                curp: this.form.curp.trim(),
                birthDate: this.form.birthDate
            };

            const response = await registerUser(userData);

            await loadingAlert.close();

            Swal.fire({  // Cambiado this.$swal -> Swal
                icon: 'success',
                title: 'Éxito',
                text: 'Cliente registrado correctamente',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                this.resetForm();
            });
        }
    } catch (error) {
        if (Swal.isVisible()) {
            Swal.close(); 
        }

        Swal.fire({ 
            icon: 'error',
            title: 'Error',
            text: error.message || 'Ocurrió un error al registrar el cliente',
            confirmButtonText: 'Aceptar'
        });
    }
}
          ,
        resetForm() {
            this.form = {
                name: '',
                lastName: '',
                curp: '',
                birthDate: ''
            };
            this.errors = {
                name: '',
                lastName: '',
                curp: '',
                birthDate: ''
            };
        }
    }
}
</script>