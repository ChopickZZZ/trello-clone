<script setup lang="ts">
import { ref } from "vue";
import { useBoardStore } from "../stores/boards";
import AppButton from "./AppButton.vue";
import AppInput from "./AppInput.vue";

const isCreating = ref(false);
const boardStore = useBoardStore();

const boardAdd = (inputText: string): void => {
  boardStore.addBoard({ status: inputText });
  isCreating.value = false
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
    <AppInput placeholder="Enter Board Name" @submit="boardAdd" @cancel="cancel" v-else />
  </div>
</template>

<style scoped>
</style>