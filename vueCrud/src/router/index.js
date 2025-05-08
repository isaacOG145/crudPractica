import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import NewCustomer from '../views/NewCustomer.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/newCustomer', component: NewCustomer},
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

