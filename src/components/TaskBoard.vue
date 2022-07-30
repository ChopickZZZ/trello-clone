<script setup lang="ts">
import TaskCard from "./TaskCard.vue";
import AppButton from "./AppButton.vue";
import { BoardInfo } from '../types'

interface Props {
  board: BoardInfo
}
const props = defineProps<Props>()

</script>

<template>
  <div class="board">
    <div class="board__top top-board">
      <div class="top-board__status">
        {{ props.board.status }}
        <span>{{ props.board.cardsAmount }}</span>
      </div>
      <div class="top-board__dropdown">
        <font-awesome-icon icon="ellipsis" />
      </div>
    </div>
    <div class="board__inner inner-board">
      <TaskCard />
      <AppButton>Add Task</AppButton>
    </div>
  </div>
</template>

<style scoped>
.board {
  width: 35rem;
  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(5px);
  padding: 1.8rem;
  border-radius: 0.3rem;
}

.board__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
}

.top-board__status {
  font-size: 1.8rem;
  font-weight: 700;
  color: #000;
}

.top-board__dropdown {
  cursor: pointer;
}

.top-board__status span {
  color: rgb(94, 94, 94);
}

.board__inner {
  padding: 1.3rem;
  background-color: #fff;
  border-radius: 0.5rem;
  max-height: 60rem;
  overflow: auto;
}
</style>