<script setup lang="ts">
const emit = defineEmits<{
   (event: 'handler'): void
}>()
const buttonHandler = (event: Event): void => {
   event.stopPropagation()
   emit('handler')
}
</script>

<template>
   <div class="drop-down">
      <button @click="buttonHandler">
         <slot />
      </button>
   </div>
</template>

<style scoped>
.drop-down {
   position: absolute;
   top: 5rem;
   right: 1rem;
   display: flex;
   align-items: center;
   justify-content: center;
   width: 70%;
   height: 4rem;
   box-shadow: rgb(0 0 0 / 40%) 0px 3px 10px, rgb(0 0 0 / 6%) 0px 6px 6px;
   border-radius: .5rem;
   z-index: 100;
   overflow: hidden;
}

.drop-down button {
   background-color: #fff;
   font-weight: 700;
   width: 100%;
   height: 100%;
}
</style>