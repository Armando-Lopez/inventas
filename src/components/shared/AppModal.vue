<script setup lang="ts">
import { ref, useSlots } from 'vue'

const $slots = useSlots()

const isOpen = ref(false)
const modalElement = ref<HTMLDialogElement>()
function toggle() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    modalElement.value?.showModal()
  } else {
    modalElement.value?.close()
  }
}

defineExpose({
  toggle
})
</script>

<template>
  <slot v-if="$slots.activator" name="activator" :on="{ click: () => toggle() }"></slot>
  <dialog ref="modalElement" class="modal">
    <div class="modal-box w-fit max-w-5xl pt-10">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="toggle">
        ✕
      </button>
      <slot v-if="isOpen"></slot>
    </div>
  </dialog>
</template>
