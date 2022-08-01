<script setup lang="ts">
import ModalLabels from './ModalLabels.vue';
import ModalTasks from './ModalTasks.vue';
import AppButton from './AppButton.vue';
import { reactive } from 'vue';
import { CardInfo, Task, Label } from '../types';
import { useCardStore } from '../stores/cards';

const emit = defineEmits<{
   (event: 'add-card', cardId: string): void,
   (event: 'modal-close'): void
}>()

interface ModalProps {
   boardId: string,
}

const props = defineProps<ModalProps>()
const cardStore = useCardStore()

const card: CardInfo = reactive({
   id: 'c' + Math.random(),
   title: '',
   description: '',
   date: '',
   boardId: props.boardId
})

const addLabels = (actualLabels: Label[]): Label[] => card.labels = actualLabels
const addTasks = (actualTasks: Task[]): Task[] => card.tasks = actualTasks

const add = () => {
   cardStore.addCard(card)
   emit('add-card', card.id)
   emit('modal-close')
}
</script>

<template>
   <div class="card-create">
      <div class="card-create__title-container">
         <fa-icon class="card-create__label-icon" icon="t" />
         <label class="card-create__label" for="title">Title</label>
      </div>
      <input class="card-create__input" type="text" id="title" placeholder="Add task title" v-model="card.title" />
      <div class="card-create__title-container">
         <fa-icon class="card-create__label-icon" icon="bars-staggered" />
         <label class="card-create__label" for="description">Description</label>
      </div>
      <input class="card-create__input" type="text" id="description" placeholder="Add description"
         v-model="card.description" />
      <div class="card-create__title-container">
         <fa-icon class="card-create__label-icon" icon="calendar-days" />
         <label class="card-create__label" for="date">Date</label>
      </div>
      <input class="card-create__input" type="date" id="date" v-model="card.date" />
      <ModalLabels @change="addLabels" />
      <ModalTasks @change="addTasks" />
      <AppButton bg-color="#379906" color="#fff" @click="add">Add Card</AppButton>
   </div>
</template>

<style>
.card-create {
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

.card-create__title-container {
   display: flex;
   align-items: center;
   justify-content: center;
   margin-bottom: 1rem;
}

.card-create__label-icon {
   margin-right: 1rem;
   color: rgb(90, 90, 90);
}

.card-create__label {
   font-weight: 700;
   font-size: 1.8rem;
}

.card-create__input {
   width: 25rem;
   background-color: rgb(235, 235, 235);
   padding: 1rem 2rem;
   border-radius: 0.3rem;
   margin-bottom: 3rem;
}
</style>