<script setup lang="ts">
</script>

<template>
   <div class="skeleton-card">
      <div class="skeleton-card__top">
         <ul class="skeleton-card__labels">
            <li class="skeleton-card__label loading"></li>
            <li class="skeleton-card__label loading"></li>
         </ul>
      </div>
      <h3 class="skeleton-card__title loading"></h3>
      <div class="skeleton-card__desc loading"></div>
      <div class="skeleton-card__details skeleton-details">
         <div class="skeleton-details-content loading">
         </div>
         <div class="skeleton-details-content loading">
         </div>
      </div>
   </div>
</template>

<style scoped>
.skeleton-card {
   position: relative;
   padding: 0.9rem;
   border-radius: 0.5rem;
   background-color: #fff;
   box-shadow: rgb(0 0 0 / 9%) 0px 9px 12px, rgb(0 0 0 / 6%) 0px 6px 6px;
   margin-bottom: 1rem;
}

.skeleton-card__top {
   display: flex;
   justify-content: space-between;
}

.skeleton-card__labels {
   display: flex;
   column-gap: 1rem;
}

.skeleton-card__label {
   width: 8rem;
   height: 2.8rem;
   padding: 0.35rem 1rem;
   border-radius: 2rem;
   margin-bottom: 1.2rem;
}

.skeleton-card__title {
   width: 15rem;
   height: 3rem;
   border-radius: 1rem;
   margin-bottom: 1.2rem;
}

.skeleton-card__desc {
   width: 2.5rem;
   height: 2rem;
   border-radius: .5rem;
   margin-bottom: 1.2rem;
}

.skeleton-card__details {
   display: flex;
   justify-content: space-between;
}

.skeleton-details-content {
   width: 5rem;
   height: 2rem;
   border-radius: 2rem;
}
</style>