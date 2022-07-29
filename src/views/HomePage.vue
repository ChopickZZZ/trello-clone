<template>
  <div class="container">
    <RegisterPage />
  </div>
</template>

<script lang="ts">
import TaskCard from "../components/TaskCard.vue";
import RegisterPage from "./RegisterPage.vue";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
  components: { TaskCard, RegisterPage },
});
</script>

<style scoped>
</style>