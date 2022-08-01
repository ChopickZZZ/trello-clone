<script setup lang="ts">

const emit = defineEmits<{
  (event: 'modal-close'): void,
}>()

</script>

<template>
  <div class="modal">
    <div class="modal__backdrop" @click="emit('modal-close')"></div>
    <slot />
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 100;
}

.modal__backdrop {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  cursor: pointer;
}
</style>