<script setup lang="ts">
import AppDropDown from './AppDropDown.vue';
import { ref, computed } from 'vue';
import { useCardStore } from '../stores/cards';
import { CardInfo, Task } from '../types';
import { dateFormatter } from '../use/date';

const props = defineProps<{
  card: CardInfo
}>()

const emit = defineEmits<{
  (event: 'remove-card', cardId: string): void
}>()

const cardStore = useCardStore()
const isDropDownOpen = ref(false)

const cardRemove = (): void => {
  cardStore.removeCard(props.card.id)
  emit('remove-card', props.card.id)
}

const tasksDoneAmount = computed((): number => {
  if (props.card.tasks === undefined) {
    throw new TypeError(`No tasks found in card ${props.card.id}`);
  }
  const tasksDone = props.card.tasks.filter(task => task.isDone === true)
  return tasksDone.length
})

</script>

<template>
  <div class="card">
    <div class="card__top">
      <ul class="card__labels">
        <li class="card__label theme" v-for="label in props.card.labels" :style="{ backgroundColor: label.color }">
          {{ label.text }}
        </li>
      </ul>
      <button class="card__dropdown" @click="isDropDownOpen = !isDropDownOpen">
        <fa-icon class="fa-ellipsis" icon="ellipsis" />
      </button>
      <AppDropDown element="card" v-if="isDropDownOpen" @remove-element="cardRemove"
        style="top: 3.5rem; right: .5rem" />
    </div>
    <h3 class="card__title">{{ props.card.title }}</h3>
    <div class="card__desc" v-if="props.card.description">
      <fa-icon class="card__desc-icon" icon="bars-staggered" :title="props.card.description" />
    </div>
    <div class="card__details details" v-if="props.card.date || props.card.tasks">
      <div class="details-content" v-if="props.card.date">
        <div class="details-content__icon">
          <fa-icon class="fa-details" icon="clock" />
        </div>
        <p class="details-content__text">{{ dateFormatter(props.card.date) }}</p>
      </div>
      <div class="details-content" v-if="props.card.tasks">
        <div class="details-content__icon">
          <fa-icon class="fa-details" icon="calendar-check" />
        </div>
        <p class="details-content__text">{{ tasksDoneAmount }} / {{ props.card.tasks.length }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  padding: 0.9rem;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 9%) 0px 9px 12px, rgb(0 0 0 / 6%) 0px 6px 6px;
  margin-bottom: 1rem;
  cursor: pointer;
}

.card:hover .card__dropdown {
  opacity: 1;
}

.card__dropdown {
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card__labels {
  display: flex;
  gap: 1rem;
}

.card__label {
  font-size: 1.45rem;
  padding: 0.35rem 1rem;
  color: #fff;
  background-color: salmon;
  border-radius: 2rem;
  margin-bottom: 1.2rem;
}

.card__title {
  font-weight: 700;
  margin-bottom: 1.2rem;
}

.card__desc {
  margin-bottom: 1.2rem;
}

.card__desc-icon {
  color: rgb(90, 90, 90);
  transition: .35s ease;
}

.card__desc-icon:hover {
  color: #000;
}

.card__details {
  display: flex;
  justify-content: space-between;
}

.details-content {
  font-size: 1.45rem;
  display: flex;
  align-items: center;
  padding: 0.2rem 0.75rem;
  background-color: rgb(235, 235, 235);
  border-radius: 2rem;
  gap: 0.5rem;
  transition: gap .35s ease
}

.details-content:hover .fa-details {
  color: #000;
}

.card:hover .details-content {
  gap: 1.5rem
}

.fa-ellipsis {
  font-size: 2rem;
  color: rgb(90, 90, 90);
  transition: color .35s ease;
}

.fa-ellipsis:hover {
  color: #000;
}

.fa-plus {
  color: rgb(155, 155, 155);
  font-weight: 700;
  font-size: 1.8rem;
}

.fa-details {
  color: rgb(151, 151, 151);
  transition: .35s ease;
}
</style>
