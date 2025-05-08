<template>
    <div class="app-container d-flex flex-column align-items-center">
        <Header />
        <div class="d-flex justify-align-center">
            <h1>Aqui debe ir un formulario</h1>
        </div>
        <div class="col-4">
            <div class="card">
                <div class="card-body">
                    <form>
                        <h2>Nuevo cliente</h2>
                        <div class="form-group">
                            <label for="name">
                                <i class="bi bi-person"></i>
                                 Nombre <span style="color: red">*</span>
                            </label>
                            <input type="text" id="name" class="form-control" placeholder="Nombre completo" />
                        </div>
                        <div class="form-group">
                            <label for="lastName">Apellidos</label>
                            <input type="text" class="form-control" id="lastName" placeholder="Apellidos">
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import { Icon } from "@iconify/vue";

export default {
    components: {
        Header
    }
}
</script>