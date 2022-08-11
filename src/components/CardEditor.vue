<script setup lang="ts">
import ModalLabels from './ModalLabels.vue';
import ModalTasks from './ModalTasks.vue';
import AppButton from './AppButton.vue';
import { reactive } from 'vue'
import { useCardStore } from '../stores/cards.js';
import { CardInfo, Label, Task } from '../types';

const props = defineProps<{
   cardId: string
}>()

const emit = defineEmits<{
   (event: 'modal-close'): void
}>()
const cardStore = useCardStore()

const card: CardInfo = cardStore.getCard(props.cardId)
const editedCard: CardInfo = reactive({ ...card })

const changeLabels = (actualLabels: Label[]): Label[] => editedCard.labels = actualLabels
const changeTasks = (actualTasks: Task[]): Task[] => editedCard.tasks = actualTasks

const cardEdit = (): void => {
   if (editedCard.title) {
      cardStore.editCard(editedCard)
      emit('modal-close')
   }
}
</script>

<template>
   <div class="card-create">
      <div class="card-create__title-container">
         <fa-icon class="card-create__label-icon" icon="t" />
         <label class="card-create__label" for="title">Title</label>
      </div>
      <input class="card-create__input" type="text" id="title" v-model="editedCard.title" />
      <div class="card-create__title-container">
         <fa-icon class="card-create__label-icon" icon="bars-staggered" />
         <label class="card-create__label" for="description">Description</label>
      </div>
      <input class="card-create__input" type="text" id="description" placeholder="Add description"
         v-model="editedCard.description" />
      <div class="card-create__title-container">
         <fa-icon class="card-create__label-icon" icon="calendar-days" />
         <label class="card-create__label" for="date">Date</label>
      </div>
      <input class="card-create__input" type="date" id="date" v-model="editedCard.date" />
      <ModalLabels :labels="card.labels" @change="changeLabels" />
      <ModalTasks :tasks="card.tasks" @change="changeTasks" />
      <AppButton bg-color="#379906" color="#fff" @click="cardEdit">Edit Card</AppButton>
   </div>
</template>

<style scoped>
</style>