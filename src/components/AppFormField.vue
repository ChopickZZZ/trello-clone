<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
defineProps<{
   name: string,
   label: string,
   modelValue: string
}>()

const emit = defineEmits<{
   (event: 'modelUpdate', $event: Event): void
}>()
</script>

<template>
   <div class="auth-main__form-control">
      <label :for="name">{{ label }}</label>
      <Field :name="name" :label="label" :id="name" :modelValue="modelValue" v-bind="$attrs"
         @input="emit('modelUpdate', $event)" />
      <ErrorMessage class="error-message" :name="name" />
   </div>
</template>

<style scoped>
.error-message {
   padding: .5rem 1rem;
   font-size: 1.4rem;
   color: rgb(192, 41, 41);
   font-weight: 600;
   background-color: rgb(252, 172, 172);
   border-radius: .5rem;
   letter-spacing: .02rem;
}
</style>