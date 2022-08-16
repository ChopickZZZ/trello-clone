<script setup lang="ts">
import AppButton from './AppButton.vue';
import AppInput from './AppInput.vue';
import { Ref, ref } from 'vue';
import { Label } from "../types"

const props = defineProps<{
   labels?: Label[]
}>()

const emit = defineEmits<{
   (event: 'change', labels: Label[]): void
}>()

const colors: string[] = ['salmon', 'lightblue', '#777', '#379906', '#99066f', '#8a0c0c', '#000', '#0c138a']
const labelColor = ref('')

let labels: Ref<Label[]> = ref([])
if (props.labels?.length) {
   labels.value = props.labels
}

const isCreating = ref(false)
const addLabel = (inputText: string): void => {
   if (inputText) {
      let labelsArr = labels.value.concat({
         text: inputText,
         color: labelColor.value
      })
      labels.value = labelsArr

      isCreating.value = false
      labelColor.value = ''
      emit('change', labels.value)
   }
}

const removeLabel = (idx: number): void => {
   labels.value = labels.value.filter((_, index) => index !== idx).map(label => ({ ...label }))
   emit('change', labels.value)
}
const cancel = (): void => {
   isCreating.value = false
}

</script>

<template>
   <div class="content__label-container">
      <fa-icon class="content__label-icon" icon="tag" />
      <label class="content__label" for="labels">Labels</label>
   </div>
   <div class="content__labels" v-if="labels.length">
      <div class="content__theme theme" v-for="(label, idx) in labels" :key="'l' + idx"
         :style="{ backgroundColor: label.color }">
         {{ label.text }}
         <fa-icon class="content__theme-icon" icon="xmark" @click="removeLabel(idx)" />
      </div>
   </div>
   <div class="content__colors" v-if="colors.length">
      <label class="content__custom-color" v-for="(color, idx) in colors" :key="'c' + idx"
         :style="{ borderColor: color }">
         <input type="radio" name="color" :value="color" v-model="labelColor">
         <span :style="{ backgroundColor: color }"></span>
      </label>
   </div>
   <div class="content__button-container" v-if="!isCreating">
      <AppButton v-if="!isCreating" @click="isCreating = true"
         :style="{ backgroundColor: 'rgb(90, 90, 90)', color: '#fff' }">
         Add label
         <template #symbol>+</template>
      </AppButton>
   </div>
   <AppInput placeholder="Enter Label Name" btn-text="Add Label" @submit="addLabel" @cancel="cancel"
      style="padding: 0; margin-bottom: 2rem;" v-else />
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

.content__button-container {
   width: 25rem;
   margin-bottom: 2rem;
}
</style>