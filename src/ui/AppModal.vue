<script setup lang="ts">
import AppButton from '../components/AppButton.vue';
import ModalLabels from '../components/ModalLabels.vue';
import ModalTasks from '../components/ModalTasks.vue';

const emit = defineEmits<{
  (event: 'modal-close'): void
}>()
</script>

<template>
  <div class="modal">
    <div class="modal__backdrop" @click="emit('modal-close')"></div>
    <div class="modal__content content">
      <div class="content__label-container">
        <fa-icon class="content__label-icon" icon="t" />
        <label class="content__label" for="title">Title</label>
      </div>
      <input class="content__input" type="text" id="title" placeholder="Add task title" />
      <div class="content__label-container">
        <fa-icon class="content__label-icon" icon="bars-staggered" />
        <label class="content__label" for="description">Description</label>
      </div>
      <input class="content__input" type="text" id="description" placeholder="Add description" />
      <div class="content__label-container">
        <fa-icon class="content__label-icon" icon="calendar-days" />
        <label class="content__label" for="date">Date</label>
      </div>
      <input class="content__input" type="date" id="date" />
      <ModalLabels />
      <ModalTasks />
      <AppButton bg-color="#379906" color="#fff">Add Card</AppButton>
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

.tasks__btn-container {
  width: 100%;
  display: flex;
  gap: 2rem;
}
</style>