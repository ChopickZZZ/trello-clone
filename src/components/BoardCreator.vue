<script setup lang="ts">
import { ref } from "vue";
import { useBoardStore } from "../stores/boards";
import AppButton from "./AppButton.vue";
import AppInput from "./AppInput.vue";
const isCreating = ref(false);
const boardStore = useBoardStore();

const boardAdd = (inputText: string): void => {
  if (inputText) {
    boardStore.addBoard(inputText);
    isCreating.value = false
  }
};

const cancel = (): void => {
  isCreating.value = false
}
</script>

<template>
  <div class="board-creator">
    <AppButton v-if="!isCreating" @click="isCreating = true">
      Add Board
    </AppButton>
    <AppInput placeholder="Enter Board Name" @submit="boardAdd" @cancel="cancel" v-if="isCreating" />
  </div>
</template>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: 0.5s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(10rem);
}
</style>