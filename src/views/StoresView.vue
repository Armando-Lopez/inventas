<script setup lang="ts">
import { useStoresStore } from '@/stores/stores'
import AddStore from '@/components/stores/AddStore.vue'
import StoreInfo from '@/components/stores/StoreInfo.vue'

const $storesStore = useStoresStore()
</script>

<template>
  <section>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-medium">Bodegas</h1>
      <AddStore />
    </div>
    <div class="flex flex-wrap">
      <div v-for="store in $storesStore.stores" class="flex-grow min-w-80 w-1/2 p-5" :key="store.id">
        <StoreInfo :store="store" />
      </div>
    </div>
  </section>
</template>
