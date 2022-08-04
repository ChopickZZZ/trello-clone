<script setup lang="ts">
import AppButton from './AppButton.vue';
import { ref } from 'vue';

interface InputProps {
   placeholder: string,
   buttonsBgColors?: string,
   btnText?: string
}

const props = withDefaults(defineProps<InputProps>(), {
   buttonsBgColors: 'salmon:lightblue',
   btnText: 'Add board'
})

const [firstBgColor, secondBgColor]: string[] = props.buttonsBgColors.split(':')

const emit = defineEmits<{
   (event: 'submit', value: string): void,
   (event: 'cancel'): void
}>()
const inputValue = ref('')

const inputHandler = (): void => {
   emit('submit', inputValue.value)
   inputValue.value = ''
}

const inputCancel = (): void => {
   inputValue.value = ''
   emit('cancel')
}

</script>

<template>
   <div class="input-form" v-bind="$attrs">
      <input type="text" :placeholder="props.placeholder" v-model="inputValue" v-focus />
      <div class="input-form__buttons">
         <AppButton :bg-color="firstBgColor" color="#fff" @click="inputHandler">{{ props.btnText }}</AppButton>
         <AppButton :bg-color="secondBgColor" color="#fff" @click="inputCancel">
            <template #symbol>
               <fa-icon icon="xmark" />
            </template>
         </AppButton>
      </div>
   </div>
</template>

<style>
.input-form {
   min-width: 25rem;
   padding: 0.9rem;
   background-color: #fff;
   border-radius: 0.35rem;
}

.input-form input {
   min-height: 4rem;
   padding: 0.5rem 1rem;
   border: 1px solid salmon;
   width: 100%;
   border-radius: 0.5rem;
   margin-bottom: 1rem;
}

.input-form__buttons {
   display: flex;
   gap: 1rem;
}
</style>