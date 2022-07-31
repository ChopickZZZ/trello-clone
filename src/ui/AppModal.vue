<script setup lang="ts">
import AppButton from '../components/AppButton.vue';
import TaskLabel from '../components/TaskLabel.vue';

const emit = defineEmits<{
  (event: 'modal-close'): void
}>()
</script>

<template>
  <div class="modal">
    <div class="modal__backdrop" @click="emit('modal-close')"></div>
    <div class="modal__content content">
      <div class="content__label-container">
        <font-awesome-icon class="content__label-icon" icon="t" />
        <label class="content__label" for="title">Title</label>
      </div>
      <input class="content__input" type="text" id="title" placeholder="Add task title" />
      <div class="content__label-container">
        <font-awesome-icon class="content__label-icon" icon="bars-staggered" />
        <label class="content__label" for="description">Description</label>
      </div>
      <input class="content__input" type="text" id="description" placeholder="Add description" />
      <div class="content__label-container">
        <font-awesome-icon class="content__label-icon" icon="calendar-days" />
        <label class="content__label" for="date">Date</label>
      </div>
      <input class="content__input" type="date" id="date" />
      <TaskLabel />
      <div class="content__label-container">
        <font-awesome-icon class="content__label-icon" icon="circle-check" />
        <label class="content__label" for="description">Tasks</label>
      </div>
      <div class="content__progress-bar-container">
        <div class="content__progress-bar"></div>
      </div>
      <div class="content__tasks tasks">
        <div class="tasks-inner">
          <div class="tasks-inner__left">
            <input type="checkbox" id="1" class="content__checkbox" />
            <label for="1">Task1_Subtask_1</label>
          </div>
          <div class="tasks-inner__right">
            <font-awesome-icon class="tasks__icon" icon="trash-can" />
          </div>
        </div>
        <div class="tasks-inner">
          <div class="tasks-inner__left">
            <input type="checkbox" id="2" class="content__checkbox" />
            <label for="2">Task1_Subtask_1</label>
          </div>
          <div class="tasks-inner__right">
            <font-awesome-icon class="tasks__icon" icon="trash-can" />
          </div>
        </div>
        <div class="tasks-inner">
          <div class="tasks-inner__left">
            <input type="checkbox" id="3" class="content__checkbox" />
            <label for="3">Task1_Subtask_1</label>
          </div>
          <div class="tasks-inner__right">
            <font-awesome-icon class="tasks__icon" icon="trash-can" />
          </div>
        </div>
      </div>
      <div class="tasks__btn-container">
        <AppButton>Add Task</AppButton>
        <AppButton :color="'lime'">Add Card</AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 100;
}

.modal__backdrop {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  cursor: pointer;
}

.modal__content {
  padding: 3rem 2.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  border-radius: 0.5rem;
  z-index: 101;
  overflow: hidden;
}

.content__label-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.content__label-icon {
  margin-right: 1rem;
  color: rgb(90, 90, 90);
}

.content__label {
  font-weight: 700;
  font-size: 1.8rem;
}

.content__input {
  width: 25rem;
  background-color: rgb(235, 235, 235);
  padding: 1rem 2rem;
  border-radius: 0.3rem;
  margin-bottom: 3rem;
}

.content__progress-bar,
.content__progress-bar-container {
  height: 0.8rem;
  border-radius: 1rem;
}

.content__progress-bar-container {
  position: relative;
  width: 100%;
  background-color: rgb(235, 235, 235);
  margin-bottom: 1rem;
}

.content__progress-bar {
  position: absolute;
  width: 66%;
  top: 0;
  left: 0;
  background-color: rgb(6, 125, 165);
}

.content__tasks {
  width: 100%;
  margin-bottom: 1.25rem;
}

.tasks-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tasks-inner label {
  cursor: pointer;
}

.tasks-inner input {
  margin-right: 0.8rem;
}

.tasks-inner:not(:last-child) {
  margin-bottom: 0.7rem;
}

.tasks__icon {
  margin-right: 0.5rem;
  color: rgb(90, 90, 90);
  cursor: pointer;
  transition: color 0.3s ease;
}

.tasks__icon:hover {
  color: #000;
}

.tasks__btn-container {
  width: 100%;
  display: flex;
  gap: 2rem;
}
</style>