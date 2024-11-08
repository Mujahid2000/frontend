import Checkout from '@/components/Checkout.vue'
import Home from '@/views/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
    }
  ],
})

export default router
