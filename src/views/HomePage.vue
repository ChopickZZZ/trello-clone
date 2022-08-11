<script setup lang="ts">
import TaskBoard from "../components/TaskBoard.vue";
import BoardCreator from "../components/BoardCreator.vue";
import { ref } from "vue";
import { useBoardStore } from "../stores/boards";
import { useUsersStore } from "../stores/users";
import { storeToRefs } from "pinia";

const isReady = ref(false)

const boardStore = useBoardStore()
const usersStore = useUsersStore()
await usersStore.fetchUser()
await boardStore.fetchBoards({ ids: usersStore.user?.boards, resource: 'boards' })

const { boards } = storeToRefs(boardStore)
isReady.value = true
</script>

<template>
  <div class="container" style="margin-top: 5rem" v-if="isReady">
    <TransitionGroup class="board-container" tag="div" name="list">
      <TaskBoard v-for="board in boards" :key="board.id" :board="board" />
      <BoardCreator :key="0" />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.board-container {
  display: grid;
  grid-template-columns: repeat(4, 35rem);
  align-items: start;
  gap: 2rem;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-leave-active {
  position: absolute;
}
</style>