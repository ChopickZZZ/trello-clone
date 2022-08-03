<script setup lang="ts">
import { ref, reactive } from 'vue';
import { AuthForm } from '../types'
import { useUsersStore } from '../stores/users.js';
import { useRouter } from 'vue-router';
const router = useRouter()
const usersStore = useUsersStore()

const isInProcess = ref(false)
const form: AuthForm = reactive({
   email: '',
   password: ''
})
const signIn = async (): Promise<void> => {
   isInProcess.value = true
   await usersStore.signInWithEmailAndPassword({ ...form })
   router.push({ name: 'Home' })
}
const signInWithGoogle = async (): Promise<void> => {
   await usersStore.signInWithGoogle()
   router.push({ name: 'Home' })
}
</script>

<template>
   <div class="auth">
      <div class="auth-container">
         <form class="auth-main" @submit.prevent="signIn">
            <h1 class="auth-main__title">LogIn</h1>
            <div class="auth-main__form-control">
               <label for="email">Email</label>
               <input type="email" id="email" v-model="form.email" />
            </div>
            <div class="auth-main__form-control">
               <label for="password">Password</label>
               <input type="password" id="password" v-model="form.password" />
            </div>
            <h2 class="auth__redirect">
               Don`t have an account yet? <router-link :to="{ name: 'Register' }">Register</router-link>
            </h2>
            <button :class="['auth__button', { process: isInProcess }]">
               {{ isInProcess ? 'Loading...' : 'LogIn' }}
            </button>
         </form>
         <div class="auth__google-container">
            <button class="auth-google__button" @click="signInWithGoogle">Sign up with Google</button>
         </div>
      </div>
   </div>
</template>

<style scoped>
.auth {
   display: flex;
   justify-content: center;
   max-width: 130rem;
   margin: 0 auto;
   flex: 1 1 100%;
   flex-wrap: wrap;
}

.auth-container {
   flex-basis: 35%;
}

.auth-main {
   display: flex;
   flex-direction: column;
   justify-content: center;
   background-color: rgba(255, 255, 255, 0.8);
   backdrop-filter: blur(5px);
   margin-top: 4rem;
   padding: 5rem;
   border-radius: 0.3rem;
}

.auth-main__title {
   text-align: center;
   font-size: 3.2rem;
   font-weight: 700;
   margin-bottom: 1rem;
}

.auth-main__form-control {
   display: inline-block;
   width: 100%;
   margin-bottom: 1.2rem;
}

.auth-main__form-control label {
   margin-bottom: 0.5rem;
}

.auth-main__form-control input {
   padding: 0.5rem 1rem;
   min-height: 4rem;
   width: 100%;
   border: 1px solid rgb(235, 235, 235);
   border-radius: 0.3rem;
}

.auth__button {
   margin-top: 1rem;
   font-size: 1.8rem;
   text-align: center;
   padding: 1rem 0;
   color: #fff;
   background-color: salmon;
   border-radius: 0.5rem;
   transition: background 0.35s ease;
}

.auth__button:hover {
   background-color: rgb(202, 67, 52);
}

.auth__button.process,
.auth__button:hover.process {
   background-color: rgb(190, 96, 86);
}

.auth__redirect a {
   font-weight: 700;
   color: #263959;
   transition: color .3s ease;
}

.auth__redirect a:hover {
   color: #172744;
}

.auth__google-container {
   text-align: center;
   padding-top: 1.5rem;
}

.auth-google__button {
   font-size: 1.5rem;
   padding: 1rem 2rem;
   color: #fff;
   background-color: #263959;
   border-radius: 0.3rem;
   transition: background 0.35s ease;
}

.auth-google__button:hover {
   background-color: #172744;
}
</style>