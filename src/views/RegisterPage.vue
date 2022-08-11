<script setup lang="ts">
import AppFormField from '../components/AppFormField.vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import { Form } from 'vee-validate'
import { registerSchema } from '../use/formValidation'
import { Guest } from '../types';
import { useUsersStore } from '../stores/users'

const router = useRouter()
const usersStore = useUsersStore()
const user: Guest = reactive({
  name: '',
  username: '',
  password: '',
  email: '',
  avatar: '',
})

const isInProcess = ref(false)
const register = async (): Promise<void> => {
  isInProcess.value = true
  await usersStore.registerWithEmailAndPassword(user)
  router.push({ name: 'Home' })
}

const registerWithGoogle = async (): Promise<void> => {
  await usersStore.signInWithGoogle()
  router.push({ name: 'Home' })
}
</script>

<template>
  <div class="auth">
    <div class="auth-container">
      <Form class="auth-main" @submit="register" :validation-schema="registerSchema">
        <h1 class="auth-main__title">Register</h1>
        <AppFormField v-model="user.name" name="name" label="Name" />
        <AppFormField v-model="user.username" name="username" label="Username" />
        <AppFormField v-model="user.email" name="email" label="Email" />
        <AppFormField v-model="user.password" name="password" label="Password" />
        <div class="auth-main__form-control">
          <label for="avatar">Avatar</label>
          <input type="text" id="avatar" v-model="user.avatar" />
        </div>
        <h2 class="auth__redirect">
          Already have an account? <router-link :to="{ name: 'Login' }">LogIn</router-link>
        </h2>
        <button :class="['auth__button', { process: isInProcess }]">{{ isInProcess ? 'Loading...' : 'Register'
        }}</button>
      </Form>
      <div class="auth__google-container">
        <button class="auth-google__button" @click="registerWithGoogle">Sign up with Google</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  flex-basis: 43%;
}
</style>