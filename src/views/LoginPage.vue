<script setup lang="ts">
import AppFormField from '../components/AppFormField.vue';
import { ref, reactive } from 'vue';
import { useUserStore } from '../stores/users.js';
import { useRouter } from 'vue-router';
import { Form } from 'vee-validate'
import { loginSchema } from '../use/formValidation'
const router = useRouter()
const userStore = useUserStore()

const isInProcess = ref(false)
const form: { email: string, password: string } = reactive({
   email: '',
   password: ''
})
const signIn = async (): Promise<void> => {
   try {
      isInProcess.value = true
      await userStore.signInWithEmailAndPassword({ ...form })
      router.push({ name: 'Home' })
   } catch (e: unknown) {
      router.push({ name: 'Login', query: { incorrect: 'login or password' } })
      isInProcess.value = false
   }
}
const signInWithGoogle = async (): Promise<void> => {
   await userStore.signInWithGoogle()
   router.push({ name: 'Home' })
}
</script>

<template>
   <div class="auth">
      <div class="auth-container">
         <Form class="auth-main" @submit="signIn" :validation-schema="loginSchema">
            <h1 class="auth-main__title">LogIn</h1>
            <AppFormField type="email" name="email" label="Email" v-model="form.email" />
            <AppFormField type="password" name="password" label="Password" v-model="form.password" />
            <h2 class="auth__redirect">
               Don`t have an account yet? <router-link :to="{ name: 'Register' }">Register</router-link>
            </h2>
            <button :class="['auth__button', { process: isInProcess }]">
               {{ isInProcess ? 'Loading...' : 'LogIn' }}
            </button>
         </Form>
         <div class="auth__google-container">
            <button class="auth-google__button" @click="signInWithGoogle">Sign up with Google</button>
         </div>
      </div>
   </div>
</template>

<style scoped>
.auth-container {
   flex-basis: 35%;
}
</style>