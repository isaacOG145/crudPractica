<template>
  <div class="app-container d-flex flex-column align-items-center">
    <Header />
    <ClientesList 
      @new-customer="goToNewCustomer"
      @edit-customer="goToEditCustomer"
      @customer-deleted="handleCustomerDeleted"
    />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import ClientesList from '../components/ClientesList.vue';

export default {
  components: {
    Header,
    ClientesList
  },
  methods: {
    goToNewCustomer() {
      this.$router.push('/newCustomer');
    },
    goToEditCustomer(cliente) {
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
    handleCustomerDeleted() {
      console.log('Cliente eliminado, actualizando vista...');
    }
  }
};
</script>