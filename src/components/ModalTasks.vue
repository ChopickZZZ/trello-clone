<script setup lang="ts">
import AppButton from './AppButton.vue';
import AppInput from './AppInput.vue';
import { ref, Ref, computed } from 'vue'

interface Task {
   text: string,
   isDone: boolean
}

const isCreating = ref(false)
const tasks: Ref<Task[]> = ref([])

const createTask = (inputValue: string): void => {
   tasks.value.push({
      text: inputValue,
      isDone: false
   })
   isCreating.value = false
}

const removeTask = (idx: number): void => {
   tasks.value = tasks.value.filter((_, index) => index !== idx)
}

const progressLength = computed(() => {
   const endedTasks = tasks.value.filter(task => task.isDone === true)
   return endedTasks.length / tasks.value.length * 100
})

const cancel = (): void => {
   isCreating.value = false
}
</script>

<template>
   <div class="content__label-container">
      <fa-icon class="content__label-icon" icon="circle-check" />
      <label class="content__label" for="description">Tasks</label>
   </div>
   <div class="content__progress-bar-container" v-if="tasks.length">
      <div class="content__progress-bar" :style="
         {
            width: progressLength + '%',
            backgroundColor: progressLength === 100 ? '#379906' : 'rgb(6, 125, 165)'
         }
      ">
      </div>
   </div>
   <div class="content__tasks tasks" v-for="(task, idx) in tasks" :key="'t' + idx">
      <div class="tasks-inner">
         <div class="tasks-inner__left">
            <input type="checkbox" :id="task.text" class="content__checkbox" :checked="task.isDone"
               @click="task.isDone = !task.isDone" />
            <label :for="task.text">{{ task.text }}</label>
         </div>
         <div class="tasks-inner__right" @click="removeTask(idx)">
            <fa-icon class="tasks__icon" icon="trash-can" />
         </div>
      </div>
   </div>
   <AppButton style="margin-bottom: 2.5rem; width: 25rem" @click="isCreating = true" v-if="!isCreating">Add Task
   </AppButton>
   <AppInput placeholder="Enter task" buttons-bg-colors="rgb(6, 125, 165):#750404" @submit="createTask" @cancel="cancel"
      style="padding: 0; margin-bottom: 2rem" v-else />
</template>

<style scoped>
.content__label-container {
   margin-bottom: 1rem;
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
   margin-bottom: 2.25rem;
}

.content__progress-bar {
   position: absolute;
   top: 0;
   left: 0;
   background-color: rgb(6, 125, 165);
}

.content__checkbox {
   cursor: pointer;
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

.content__label-icon {
   margin-right: 1rem;
   color: rgb(90, 90, 90);
}

.task-creator__form {
   width: 25rem;
   margin-bottom: 2.5rem;
}

.task-creator__form input {
   width: 100%;
   background-color: rgb(235, 235, 235);
   padding: 1rem 2rem;
   border-radius: .5rem;
   margin-bottom: .9rem;
}

.task-creator__buttons {
   display: flex;
   gap: 1.5rem;
}
</style>