<script setup lang="ts">
import TheHeader from './components/TheHeader.vue';
</script>

<template>
  <TheHeader />
  <Suspense>
    <router-view />
  </Suspense>
</template>

<style scoped>
</style>
