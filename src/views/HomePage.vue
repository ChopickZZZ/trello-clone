<template>
  <div class="container">
    <div class="board-container">
      <TaskBoard v-for="board in 4" :key="board" />
    </div>
  </div>
</template>

<script lang="ts">
import TaskBoard from "../components/TaskBoard.vue";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
  components: { TaskBoard },
});
</script>

<style scoped>
.board-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}
</style>