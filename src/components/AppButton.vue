<script setup lang="ts">
</script>

<template>
  <button class="main-button" v-bind="$attrs">
    <span>
      <slot name="symbol">+</slot>
    </span>
    <slot name="default"></slot>
  </button>
</template>

<style scoped>
.main-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  width: 100%;
  padding: 0.8rem 0;
  background-color: #fff;
  border-radius: 0.7rem;
  box-shadow: rgb(0 0 0 / 26%) 0px 3px 3px, rgb(0 0 0 / 6%) 0px 6px 6px;
  transition: all 0.3s ease;
}

.main-button:hover {
  transform: translateY(-0.25rem);
  box-shadow: rgb(0 0 0 / 26%) 0px 3px 6px, rgb(0 0 0 / 6%) 0px 6px 9px;
}

.main-button:active {
  transform: translateY(-0.1rem);
  box-shadow: rgb(0 0 0 / 26%) 0px 3px 4px, rgb(0 0 0 / 6%) 0px 6px 7px;
}

.main-button span {
  font-size: 2rem;
  margin-right: 0.5rem;
  margin-top: -0.2rem;
}
</style>