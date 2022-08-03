import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
   {
      path: '/',
      name: 'Home',
      component: HomePage
   },
   {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/RegisterPage.vue')
   },
   {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginPage.vue')
   }
]

const router = createRouter({
   history: createWebHistory(),
   routes,
})

export default router