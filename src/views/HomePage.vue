<script setup lang="ts">
import { useBoardStore } from "../stores/boards";
import TaskBoard from "../components/TaskBoard.vue";
import BoardCreator from "../components/BoardCreator.vue";

const boardStore = useBoardStore()
</script>

<template>
  <div class="container" style="margin-top: 5rem">
    <div class="board-container">
      <TaskBoard v-for="board in boardStore.boards" :key="board.id" :board="board" />
      <BoardCreator />
    </div>
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