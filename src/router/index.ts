import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
   {
      path: '/',
      name: 'Home',
      component: HomePage
   }
]

const router = createRouter({
   history: createWebHistory(),
   routes,
})

export default router