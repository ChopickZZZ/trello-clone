import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '../stores/users'
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
   },
   {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundPage.vue')
   }
]

const router = createRouter({
   history: createWebHistory(),
   routes,
})

router.beforeEach(async to => {
   const userStore = useUserStore()
   await userStore.initAuthentication()

   if (to.meta.requiresAuth && !userStore.authId) {
      return { name: 'Login' }
   }
   else if (!to.meta.requiresAuth && userStore.authId) {
      return { name: 'Home' }
   }
})

export default router