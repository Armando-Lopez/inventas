<script setup lang="ts">
import type { StoreModel } from '@/stores/stores'
import { computed } from 'vue'
import AppModal from '@/components/shared/AppModal.vue'
import StoreInfoAddProducts from '@/components/stores/StoreInfoAddProducts.vue'
import StoreInfoUpdateProducts from '@/components/stores/StoreInfoUpdateProducts.vue'

const props = defineProps<{
  store: StoreModel
}>()

const totalProducts = computed(() =>
  props.store.store_products.reduce((acc, item) => acc + item.quantity, 0)
)
const hasProducts = computed(() => totalProducts.value > 0)
</script>

<template>
  <div class="card card-compact bg-base-100 border shadow">
    <div class="card-body">
      <h2 class="card-title">{{ store.name }}</h2>
      <p class="text-neutral/80">{{ store.description }}</p>
      <div class="flex flex-wrap justify-between items-center gap-3 mt-3">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined"> package_2 </span>
          Productos en esta bodega: <strong>{{ totalProducts }}</strong>
        </div>
        <div class="collapse collapse-arrow bg-base-200">
          <input type="checkbox" />
          <div class="collapse-title text-lg font-medium">Productos</div>
          <div class="collapse-content">
            <div class="flex justify-between">
              <AppModal>
                <template #activator="{ on }">
                  <button
                    v-on="on"
                    class="mb-4 btn btn-outline btn-sm btn-success"
                    title="Ingresar productos"
                  >
                    <span class="material-symbols-outlined"> login </span>
                    Ingresar
                  </button>
                </template>
                <StoreInfoAddProducts :store="store" />
              </AppModal>
              <AppModal v-if="hasProducts">
                <template #activator="{ on }">
                  <button
                    v-on="on"
                    class="btn btn-outline btn-sm btn-error"
                    title="Sacar productos"
                  >
                    <span class="material-symbols-outlined"> edit </span>
                    Modificar
                  </button>
                </template>
                <StoreInfoUpdateProducts :store="store" />
              </AppModal>
            </div>
            <ul class="grid divide-y">
              <li
                v-for="storeProduct in store.store_products"
                :key="storeProduct.id"
                class="flex justify-between items-center py-1"
              >
                <span>
                  {{ storeProduct.products.name }}
                </span>
                <span>
                  <strong>
                    {{ storeProduct.quantity }}
                  </strong>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
