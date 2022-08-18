<script setup lang="ts">
import TheHeader from './components/TheHeader.vue';
import SkeletonBoardlist from './components/loading/SkeletonBoardlist.vue'
</script>

<template>
  <TheHeader />
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Suspense>
        <component :is="Component" />
        <template #fallback>
          <SkeletonBoardlist />
        </template>
      </Suspense>
    </template>
  </RouterView>
</template>

<style scoped>
</style>
