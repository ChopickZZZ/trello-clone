<template>
  <div class="modal">
    <div class="modal__backdrop"></div>
    <div class="modal__content content">
      <div class="content__label-container">
        <font-awesome-icon class="content__label-icon" icon="t" />
        <label class="content__label" for="title">Title</label>
      </div>
      <input
        class="content__input"
        type="text"
        id="title"
        placeholder="Add task title"
      />
      <div class="content__label-container">
        <font-awesome-icon class="content__label-icon" icon="bars-staggered" />
        <label class="content__label" for="description">Description</label>
      </div>
      <input
        class="content__input"
        type="text"
        id="description"
        placeholder="Add description"
      />
      <div class="content__label-container">
        <font-awesome-icon class="content__label-icon" icon="calendar-days" />
        <label class="content__label" for="date">Date</label>
      </div>
      <input class="content__input" type="date" id="date" />
      <div class="content__label-container">
        <font-awesome-icon class="content__label-icon" icon="tag" />
        <label class="content__label" for="labels">Labels</label>
      </div>
      <div class="content__theme theme">
        Urgent
        <font-awesome-icon class="content__theme-icon" icon="xmark" />
      </div>
      <ul class="content__colors">
        <li class="content__color"></li>
        <li class="content__color"></li>
        <li class="content__color"></li>
        <li class="content__color"></li>
        <li class="content__color"></li>
        <li class="content__color"></li>
        <li class="content__color"></li>
        <li class="content__color"></li>
      </ul>
      <button class="content__button">Add label <span>+</span></button>
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
      <button class="content__button">Add a task <span>+</span></button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>

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
  background-color: rgb(235, 235, 235);
  padding: 1rem 2rem;
  border-radius: 0.3rem;
  margin-bottom: 3rem;
}

.content__theme {
  margin-bottom: 1.5rem;
  cursor: pointer;
}

.content__theme-icon {
  margin-left: 0.6rem;
  margin-bottom: -0.1rem;
}

.content__colors {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.content__color {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  transition: transform 0.3s ease;
  cursor: pointer;
  background-color: #000;
}

.content__color:hover {
  transform: scale(1.15);
}

.content__button {
  color: #fff;
  padding: 0.7rem 2rem;
  background-color: rgb(90, 90, 90);
  border-radius: 1rem;
  transition: 0.3s ease;
}

.content__button:hover {
  transform: translateY(-0.2rem);
  background-color: #000;
  box-shadow: rgb(0 0 0 / 26%) 0px 3px 6px, rgb(0 0 0 / 6%) 0px 6px 9px;
}

.content__button span {
  font-size: 2rem;
  margin-left: 1rem;
  margin-top: -0.25rem;
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

button:not(:last-child) {
  margin-bottom: 3rem;
}
</style>