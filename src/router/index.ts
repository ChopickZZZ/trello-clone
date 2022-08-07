import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useUsersStore } from '../stores/users'
import HomePage from '@/views/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
   {
      path: '/',
      name: 'Home',
      component: HomePage,
      meta: { requiresAuth: true }
   },
   {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/RegisterPage.vue'),
   },
   {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginPage.vue'),
   }
]

const router = createRouter({
   history: createWebHistory(),
   routes,
})

router.beforeEach(async to => {
   const usersStore = useUsersStore()
   await usersStore.initAuthentication()

   if (to.meta.requiresAuth && !usersStore.authId) {
      return { name: 'Login' }
   }
   else if (!to.meta.requiresAuth && usersStore.authId) {
      return { name: 'Home' }
   }
})

export default router