<script setup lang="ts">
import { useBoardStore } from "../stores/boards";
import { ref } from "vue";
import TaskBoard from "../components/TaskBoard.vue";
import BoardCreator from "../components/BoardCreator.vue";
import AppModal from '../ui/AppModal.vue'

const isOpen = ref(false)
const boardStore = useBoardStore()
const modalHandler = () => isOpen.value = !isOpen.value
</script>

<template>
  <div class="container" style="margin-top: 5rem">
    <div class="board-container">
      <TaskBoard v-for="board in boardStore.boards" :key="board.id" :board="board" @modal-open="modalHandler" />
      <BoardCreator />
    </div>
    <teleport to="#app">
      <AppModal v-if="isOpen" v-lock @modal-close="modalHandler" />
    </teleport>
  </div>
</template>

<style scoped>
.board-container {
  display: grid;
  grid-template-columns: repeat(4, 35rem);
  align-items: start;
  gap: 2rem;
}
</style>