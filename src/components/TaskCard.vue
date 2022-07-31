<script setup lang="ts">
</script>

<template>
  <div class="card">
    <div class="card__top">
      <h2 class="card__theme theme">Urgent</h2>
      <div class="card__dropdown">
        <font-awesome-icon class="fa-ellipsis" icon="ellipsis" />
      </div>
    </div>
    <h3 class="card__title">Task 1</h3>
    <div class="card__desc">
      <font-awesome-icon class="card__desc-icon" icon="bars-staggered" />
    </div>
    <div class="card__details details">
      <div class="details-content">
        <div class="details-content__icon">
          <font-awesome-icon class="fa-details" icon="clock" />
        </div>
        <p class="details-content__text">5 May</p>
      </div>
      <div class="details-content">
        <div class="details-content__icon">
          <font-awesome-icon class="fa-details" icon="calendar-check" />
        </div>
        <p class="details-content__text">3/3</p>
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

.card__theme {
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
