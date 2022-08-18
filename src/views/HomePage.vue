<script setup lang="ts">
import TaskBoard from "../components/TaskBoard.vue";
import BoardCreator from "../components/BoardCreator.vue";
import { ref } from "vue";
import { useBoardStore } from "../stores/boards";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";
import { useCardStore } from "../stores/cards";
import { setSkeletonStructure } from "../helpers";

const isReady = ref(false)

await useUserStore().fetchUser()
await useBoardStore().fetchBoards({ ids: useUserStore().user?.boards, resource: 'boards' })

const { boards } = storeToRefs(useBoardStore())
const cardIds = boards.value.map(board => board.cards).flat()
await useCardStore().fetchCards({ ids: cardIds, resource: 'cards' })
setSkeletonStructure()
isReady.value = true
</script>

<template>
  <div class="container" v-if="isReady">
    <TransitionGroup class="board-container" tag="div" name="list">
      <TaskBoard v-for="board in boards" :key="board.id" :board="board" />
      <BoardCreator :key="0" />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.board-container {
  padding: 5rem 0;
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