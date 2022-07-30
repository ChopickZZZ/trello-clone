<script setup lang="ts">
import { ref } from "vue";
import { useBoardStore } from "../stores/boards";
import AppButton from "./AppButton.vue";

const isCreating = ref(false);
const boardStatus = ref("");
const boardStore = useBoardStore();

const submit = (): void => {
  boardStore.addBoard({ status: boardStatus.value });
  boardStatus.value = ''
  isCreating.value = false
};

const cancel = (): void => {
  boardStatus.value = ''
  isCreating.value = false
}
</script>

<template>
  <div class="board-creator">
    <AppButton v-if="!isCreating" @click="isCreating = true">Add Board
    </AppButton>
    <form class="board-creator__form" v-if="isCreating" @submit.prevent="submit">
      <input type="text" placeholder="Enter Board Name" v-model="boardStatus" />
      <div class="board-creator__buttons">
        <AppButton color="salmon" type="submit">Add Board</AppButton>
        <AppButton color="lightblue" @click="cancel" type="cancel">
          <template #symbol>
            <font-awesome-icon icon="xmark" />
          </template>
        </AppButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.board-creator__form {
  padding: 0.9rem;
  background-color: #fff;
  border-radius: 0.35rem;
}

.board-creator input {
  min-height: 4rem;
  padding: 0.5rem 1rem;
  border: 1px solid salmon;
  width: 100%;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.board-creator__buttons {
  display: flex;
  gap: 1rem;
}
</style>