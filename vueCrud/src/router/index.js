import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import NewCustomer from '../views/NewCustomer.vue';
import UpdateCustomer from '../views/UpdateCustomer.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/newCustomer', component: NewCustomer},
  { path: '/updateCustomer', component: UpdateCustomer},
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

