<template>
  <ClienteForm :is-edit-mode="true" />
</template>

<script>
import ClienteForm from '../components/ClienteForm.vue';

export default {
  components: {
    ClienteForm
  }
};
</script>