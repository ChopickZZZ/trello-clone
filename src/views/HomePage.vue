<template>
  <div class="container" style="margin-top: 5rem">
    <div class="board-container">
      <TaskBoard v-for="board in 3" :key="board" />
      <BoardCreator />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskBoard from "../components/TaskBoard.vue";
import BoardCreator from "../components/BoardCreator.vue";

export default defineComponent({
  setup() {},
  components: { TaskBoard, BoardCreator },
});
</script>

<style scoped>
.board-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: start;
  gap: 2rem;
}
</style>