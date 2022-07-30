<template>
  <div class="board">
    <div class="board__top top-board">
      <div class="top-board__status">
        Discover
        <span>2</span>
      </div>
      <div class="top-board__dropdown">
        <font-awesome-icon icon="ellipsis" />
      </div>
    </div>
    <div class="board__inner inner-board">
      <TaskCard />
      <button class="inner-board__button btn"><span>+</span> Add Card</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskCard from "./TaskCard.vue";

export default defineComponent({
  setup() {},
  components: {
    TaskCard,
  },
});
</script>

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

.inner-board__button {
  width: 100%;
  background-color: #fff;
  padding: 0.8rem 0;
  border-radius: 0.7rem;
  box-shadow: rgb(0 0 0 / 26%) 0px 3px 3px, rgb(0 0 0 / 6%) 0px 6px 6px;
  transition: all 0.3s ease;
}

.inner-board__button:hover {
  transform: translateY(-0.25rem);
  box-shadow: rgb(0 0 0 / 26%) 0px 3px 6px, rgb(0 0 0 / 6%) 0px 6px 9px;
}

.inner-board__button:active {
  transform: translateY(-0.1rem);
  box-shadow: rgb(0 0 0 / 26%) 0px 3px 4px, rgb(0 0 0 / 6%) 0px 6px 7px;
}

.inner-board__button span {
  font-size: 2rem;
  margin-right: 0.5rem;
  margin-top: -0.2rem;
}
</style>