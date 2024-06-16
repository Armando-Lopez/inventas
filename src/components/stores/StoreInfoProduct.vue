<script setup lang="ts">
import type { StoreModel } from '@/stores/stores'

const props = defineProps<{
  store: StoreModel
}>()
</script>

<template>
  <div class="dropdown">
    <button
      class="btn btn-square btn-outline btn-sm rotate-90 btn-success"
      title="Ingresar productos"
    >
      <span class="material-symbols-outlined"> login </span>
    </button>
    <ul
      tabindex="0"
      class="dropdown-content z-20 menu p-2 w-[30rem] shadow-lg border-2 bg-base-100 rounded-box"
    >
      <li><a>Item 1</a></li>
      <li><a>Item 2</a></li>
    </ul>
  </div>
</template>
