<script setup lang="ts">
import AppButton from './AppButton.vue';
import { Ref, ref } from 'vue';

interface Label {
   text: string,
   color: string
}

const colors: string[] = ['salmon', 'lightblue', '#777', '#379906', '#99066f', '#8a0c0c', '#000', '#0c138a']
const labelColor = ref('')

const label = ref('')
let labels: Ref<Label[]> = ref([])

const isCreating = ref(false)
const addLabel = () => {
   if (label.value) {
      labels.value.push({
         text: label.value,
         color: labelColor.value
      })
      isCreating.value = false
      label.value = ''
      labelColor.value = ''
   }
}

const removeLabel = (idx: number): void => {
   labels.value = labels.value.filter((_, index) => index !== idx)
}
const cancel = () => {
   isCreating.value = false
   label.value = ''
}

</script>

<template>
   <div class="content__label-container">
      <font-awesome-icon class="content__label-icon" icon="tag" />
      <label class="content__label" for="labels">Labels</label>
   </div>
   <div class="content__labels" v-if="labels.length">
      <div class="content__theme theme" v-for="(label, idx) in labels" :key="'l' + idx"
         :style="{ backgroundColor: label.color }">
         {{ label.text }}
         <font-awesome-icon class="content__theme-icon" icon="xmark" @click="removeLabel(idx)" />
      </div>
   </div>
   <div class="content__colors" v-if="colors.length">
      <label class="content__custom-color" v-for="(color, idx) in colors" :key="'c' + idx"
         :style="{ borderColor: color }">
         <input type="radio" name="color" :value="color" v-model="labelColor">
         <span :style="{ backgroundColor: color }"></span>
      </label>
   </div>
   <button class="content__button" v-if="!isCreating" @click="isCreating = true">Add label<span>+</span></button>
   <div class="label-creator__form" v-if="isCreating">
      <input type="text" placeholder="Enter Label Name" v-model="label" />
      <div class="label-creator__buttons">
         <AppButton color="salmon" type="submit" @click="addLabel">Add Label</AppButton>
         <AppButton color="lightblue" @click="cancel" type="cancel">
            <template #symbol>
               <font-awesome-icon icon="xmark" />
            </template>
         </AppButton>
      </div>
   </div>
</template>

<style scoped>
.content__label-container {
   display: flex;
   align-items: center;
   justify-content: center;
   margin-bottom: 1rem;
}

.content__theme {
   cursor: pointer;
}

.content__label-icon {
   margin-right: 1rem;
   color: rgb(90, 90, 90);
}

.content__theme-icon {
   margin-left: 0.6rem;
   margin-bottom: -0.1rem;
}

.content__labels {
   display: flex;
   flex-wrap: wrap;
   gap: 1.25rem;
   margin-bottom: 1.5rem;
}

.content__colors {
   display: flex;
   gap: 1.75rem;
   margin-bottom: 2rem;
}

.content__custom-color {
   width: 2.4rem;
   height: 2.4rem;
   border: 2px solid #444;
   border-radius: 50%;
   display: flex;
   align-content: center;
   justify-content: center;
   cursor: pointer;
}

.content__custom-color span {
   align-self: center;
   width: calc(100%);
   height: calc(100%);
   background-color: #222;
   border-radius: 50%;
   display: inline-block;
   opacity: 0;
   transition: opacity .35s ease;
}

.content__custom-color input:checked+span {
   opacity: 1;
}

.content__custom-color input {
   display: none;
}

.content__button {
   color: #fff;
   padding: 0.7rem 2rem;
   background-color: rgb(90, 90, 90);
   border-radius: 1rem;
   transition: 0.3s ease;
   margin-bottom: 3rem;
}

.content__button:hover {
   transform: translateY(-0.2rem);
   background-color: #000;
   box-shadow: rgb(0 0 0 / 26%) 0px 3px 6px, rgb(0 0 0 / 6%) 0px 6px 9px;
}

.content__button span {
   font-size: 2rem;
   margin-left: 1rem;
   margin-top: -0.25rem;
}

.label-creator__form {
   width: 25rem;
   margin-bottom: 1rem;
}

.label-creator__form input {
   width: 100%;
   background-color: rgb(235, 235, 235);
   padding: 1rem 2rem;
   border-radius: .5rem;
   margin-bottom: .9rem;
}

.label-creator__buttons {
   display: flex;
   gap: 1.5rem;
}
</style>