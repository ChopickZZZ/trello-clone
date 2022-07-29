<template>
  <div class="register">
    <div class="register-container">
      <form class="register-main">
        <h1 class="register-main__title">Register</h1>
        <div class="register-main__form-control">
          <label for="name">Name</label>
          <input type="text" id="name" />
        </div>
        <div class="register-main__form-control">
          <label for="username">Username</label>
          <input type="text" id="username" />
        </div>
        <div class="register-main__form-control">
          <label for="email">Email</label>
          <input type="email" id="email" />
        </div>
        <div class="register-main__form-control">
          <label for="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div class="register-main__form-control">
          <label for="avatar">Avatar</label>
          <input type="text" id="avatar" />
        </div>
        <h2 class="register__redirect">
          Already have an account? <a href="#">LogIn</a>
        </h2>
        <button class="register__button">Register</button>
      </form>
      <div class="register__google-container">
        <button class="register-google__button">Sign up with Google</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>


<style scoped>
.register {
  display: flex;
  justify-content: center;
  max-width: 130rem;
  margin: 0 auto;
  flex: 1 1 100%;
  flex-wrap: wrap;
}

.register-container {
  flex-basis: 48%;
}

.register-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  margin-top: 4rem;
  padding: 5rem;
  border-radius: 0.3rem;
}

.register-main__title {
  text-align: center;
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.register-main__form-control {
  display: inline-block;
  width: 100%;
  margin-bottom: 1.2rem;
}

.register-main__form-control label {
  margin-bottom: 0.5rem;
}

.register-main__form-control input {
  padding: 0.5rem 1rem;
  min-height: 4rem;
  width: 100%;
  border: 1px solid rgb(235, 235, 235);
  border-radius: 0.3rem;
}

.register__button {
  margin-top: 1rem;
  font-size: 1.8rem;
  text-align: center;
  padding: 1rem 0;
  color: #fff;
  background-color: salmon;
  border-radius: 0.5rem;
  transition: background 0.35s ease;
}

.register__button:hover {
  background-color: rgb(202, 67, 52);
}

.register__google-container {
  text-align: center;
  padding-top: 1.5rem;
}

.register-google__button {
  font-size: 1.5rem;
  padding: 1rem 2rem;
  color: #fff;
  background-color: #263959;
  border-radius: 0.3rem;
  transition: background 0.35s ease;
}

.register-google__button:hover {
  background-color: #172744;
}
</style>