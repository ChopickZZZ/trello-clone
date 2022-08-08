<script setup lang="ts">
import { ref, computed } from "vue";
import { useBoardStore } from "../stores/boards";
import { useUsersStore } from "../stores/users";
import TaskBoard from "../components/TaskBoard.vue";
import BoardCreator from "../components/BoardCreator.vue";

const isReady = ref(false)

const boardStore = useBoardStore()
const usersStore = useUsersStore()
await usersStore.fetchUser()
await boardStore.fetchBoards({ ids: usersStore.user?.boards, resource: 'boards' })

const boards = computed(() => boardStore.boards)
isReady.value = true
</script>

<template>
  <div class="container" style="margin-top: 5rem" v-if="isReady">
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