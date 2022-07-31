<script setup lang="ts">
import { computed } from 'vue';
import { CardInfo } from '../types';

const props = defineProps<{
  card: CardInfo
}>()

const tasksDone = computed(() => props.card.tasks?.filter(task => task.isDone === true))

</script>

<template>
  <div class="card">
    <div class="card__top">
      <ul class="card__labels">
        <li class="card__label theme" v-for="label in props.card.labels" :style="{ backgroundColor: label.color }">
          {{ label.text }}
        </li>
      </ul>
      <div class="card__dropdown">
        <fa-icon class="fa-ellipsis" icon="ellipsis" />
      </div>
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
        <p class="details-content__text">{{ props.card.date }}</p>
      </div>
      <div class="details-content" v-if="props.card.tasks">
        <div class="details-content__icon">
          <fa-icon class="fa-details" icon="calendar-check" />
        </div>
        <p class="details-content__text">{{ tasksDone?.length }} / {{ props.card.tasks?.length }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
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
  transition: .3s ease;
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
}

.fa-ellipsis {
  font-size: 2rem;
  color: rgb(90, 90, 90);
}

.fa-plus {
  color: rgb(155, 155, 155);
  font-weight: 700;
  font-size: 1.8rem;
}

.fa-details {
  color: rgb(151, 151, 151);
}
</style>
