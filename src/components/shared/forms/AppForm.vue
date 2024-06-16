<script setup lang="ts">
import { useForm } from 'vee-validate'
import { ref } from 'vue'

const props = defineProps({
  toSubmit: { type: Function, default: () => {} }
})

const emit = defineEmits(['submit', 'error'])

const { handleSubmit, meta, resetForm } = useForm()

defineExpose({
  resetForm
})

const isLoading = ref(false)

const onSubmit = handleSubmit(
  async (values) => {
    if (isLoading.value) {
      return
    }
    isLoading.value = true
    emit('submit', values)
    await props.toSubmit(values)
    isLoading.value = false
  },
  (error) => {
    emit('error', error)
  }
)
</script>

<template>
  <form @submit="onSubmit">
    <slot :meta="meta" :is-loading="isLoading"></slot>
  </form>
</template>
