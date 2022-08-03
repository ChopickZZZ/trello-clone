<script setup lang="ts">
import { computed } from "vue";
import { useBoardStore } from "../stores/boards";
import { useCardStore } from "../stores/cards";
import { useUsersStore } from "../stores/users";
import { BoardInfo } from "../types";
import TaskBoard from "../components/TaskBoard.vue";
import BoardCreator from "../components/BoardCreator.vue";

const boardStore = useBoardStore()
const cardStore = useCardStore()
const usersStore = useUsersStore()
await boardStore.fetchBoards()
await cardStore.fetchCards()
await usersStore.fetchUser()

const boards = computed((): BoardInfo[] => boardStore.boards)
</script>

<template>
  <div class="container" style="margin-top: 5rem">
    <div class="board-container">
      <TaskBoard v-for="board in boards" :key="board.id" :board="board" />
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