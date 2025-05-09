<template>
  <button class="back-button">
    <i class="bi bi-arrow-left-circle-fill"></i>
    <span v-if="text" class="ms-2">{{ text }}</span>
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.back-button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  color: #6c757d; /* Color gris por defecto */
  font-size: 1.5rem;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
}

.back-button:hover {
  color: #0d6efd; /* Color azul de Bootstrap al hover */
  transform: scale(1.05);
}

.back-button:active {
  transform: scale(0.95);
}

/* Si quieres que el texto tenga diferente tamaño */
.back-button span {
  font-size: 1rem;
}
</style>