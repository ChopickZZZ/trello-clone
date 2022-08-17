<script setup lang="ts">
import SkeletonCard from './SkeletonCard.vue'
let skeletonStructure: number[] = []
if (localStorage.getItem('skeleton') !== null) {
   skeletonStructure = JSON.parse(localStorage.getItem('skeleton')!)
}
</script>

<template>
   <div class="container">
      <div class="skeleton-board-container">
         <div class="skeleton-board" v-for="(_, index) in skeletonStructure.length" :key="'b' + index">
            <div class="skeleton-board__top top-skeleton-board">
               <div class="top-skeleton-board__status loading"></div>
            </div>
            <div class="skeleton-board__inner inner-skeleton-board">
               <SkeletonCard v-for="(_, idx) in skeletonStructure[index]" :key="'c' + idx" />
               <button class="main-button loading"></button>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>
.skeleton-board-container {
   padding: 5rem 0;
   display: grid;
   grid-template-columns: repeat(4, 35rem);
   align-items: start;
   gap: 2rem;
}

.skeleton-board {
   position: relative;
   width: 35rem;
   background-color: rgb(216, 216, 216);
   padding: 1.8rem;
   border-radius: 0.3rem;
}

.skeleton-board__top {
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding-top: 1rem;
   padding-bottom: 0.5rem;
}

.top-skeleton-board__status {
   width: 8rem;
   height: 2.2rem;
   border-radius: 1rem;
}

.skeleton-board__inner {
   max-height: 60rem;
   padding: 1.3rem;
   background-color: #fff;
   border-radius: 0.5rem;
   overflow: auto;
}

.main-button {
   width: 100%;
   height: 4rem;
   border-radius: 0.7rem;
   box-shadow: rgb(0 0 0 / 9%) 0px 9px 12px, rgb(0 0 0 / 6%) 0px 6px 6px;
   cursor: auto;
}
</style>