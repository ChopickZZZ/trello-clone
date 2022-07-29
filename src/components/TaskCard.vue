<template>
  <div class="card">
    <div class="card__top top-card">
      <div class="top-card__status">
        Discover
        <span>2</span>
      </div>
      <div class="top-card__dropdown">
        <font-awesome-icon icon="ellipsis" />
      </div>
    </div>
    <div class="card__inner inner-card">
      <div class="inner-card__content">
        <div class="inner-card__top">
          <h2 class="inner-card__theme theme">Urgent</h2>
          <div class="inner-card__dropdown">
            <font-awesome-icon class="fa-ellipsis" icon="ellipsis" />
          </div>
        </div>
        <h3 class="inner-card__title">Task 1</h3>
        <div class="inner-card__edit">icon</div>
        <div class="inner-card__details details">
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
      <button class="inner-card__button btn"><span>+</span> Add Card</button>
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
.card {
  width: 35rem;
  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(5px);
  padding: 1.8rem;
  border-radius: 0.3rem;
}

.card__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
}

.top-card__status {
  font-size: 1.8rem;
  font-weight: 700;
  color: #000;
}

.top-card__dropdown {
  cursor: pointer;
}

.top-card__status span {
  color: rgb(94, 94, 94);
}

.card__inner {
  padding: 1.3rem;
  background-color: #fff;
  border-radius: 0.5rem;
  max-height: 60rem;
  overflow: auto;
}

.inner-card__content {
  padding: 0.9rem;
  border-radius: 0.5rem;
  box-shadow: rgb(0 0 0 / 9%) 0px 9px 12px, rgb(0 0 0 / 6%) 0px 6px 6px;
  margin-bottom: 1rem;
  cursor: pointer;
}

.inner-card__content:hover .inner-card__dropdown {
  opacity: 1;
}

.inner-card__dropdown {
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.inner-card__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.inner-card__theme {
  font-size: 1.45rem;
  padding: 0.35rem 1rem;
  color: #fff;
  background-color: salmon;
  border-radius: 2rem;
  margin-bottom: 1.2rem;
}

.inner-card__title {
  font-weight: 700;
  margin-bottom: 1.2rem;
}

.inner-card__edit {
  margin-bottom: 1.2rem;
}

.inner-card__details {
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

.inner-card__button {
  width: 100%;
  background-color: #fff;
  padding: 0.8rem 0;
  border-radius: 0.7rem;
  box-shadow: rgb(0 0 0 / 26%) 0px 3px 3px, rgb(0 0 0 / 6%) 0px 6px 6px;
  transition: all 0.3s ease;
}

.inner-card__button:hover {
  transform: translateY(-0.25rem);
  box-shadow: rgb(0 0 0 / 26%) 0px 3px 6px, rgb(0 0 0 / 6%) 0px 6px 9px;
}

.inner-card__button:active {
  transform: translateY(-0.1rem);
  box-shadow: rgb(0 0 0 / 26%) 0px 3px 4px, rgb(0 0 0 / 6%) 0px 6px 7px;
}

.inner-card__button span {
  font-size: 2rem;
  margin-right: 0.5rem;
  margin-top: -0.2rem;
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
