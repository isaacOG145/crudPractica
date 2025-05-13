<template>
  <div class="search-container">
    <input
      type="text"
      name="searchById"
      id="searchById"
      placeholder="Buscar por ID"
      v-model="searchTerm"
      @keyup.enter="triggerSearch"
    >
    <button class="search-button" @click="triggerSearch">
      <i class="bi bi-search"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      searchTerm: ''
    }
  },
  methods: {
    triggerSearch() {
      if (this.searchTerm.trim()) {
        this.$emit('search', this.searchTerm.trim());
      } else {
        this.$emit('clear-search');
      }
    }
  }
}
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

input[type=text] {
  width: 200px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 12px;
  font-size: 14px;
  background-color: transparent;
  padding: .5rem 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: width 0.4s ease-in-out;
}

input[type=text]:focus {
  border: 1px solid #064979;
  outline: none;
}

.search-button {
  background-color: #171BA4;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button:hover {
  background-color: #101383;
}

.search-button i {
  font-size: 16px;
}
</style>