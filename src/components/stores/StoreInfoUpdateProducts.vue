<script setup lang="ts">
import { useStoresStore, type StoreModel } from '@/stores/stores'
import { ref } from 'vue'

const $storesStore = useStoresStore()

const props = defineProps<{
  store: StoreModel
}>()

const isLoading = ref(false)

const storeProducts = ref(
  props.store.store_products.map((store_product) => ({
    id: store_product.id,
    storeId: store_product.store_id,
    productId: store_product.product_id,
    quantity: store_product.quantity,
    previousQuantity: store_product.quantity,
    productName: store_product.products.name
  }))
)

async function saveChanges() {
  const isValid = storeProducts.value.every(
    (item) => item.quantity >= 0 && !Number.isNaN(item.quantity)
  )
  if (!isValid) {
    return alert('Ingresa valores numericos validos')
  }
  isLoading.value = true
  await $storesStore.updateProductsByStore(storeProducts.value)
  isLoading.value = false
}
</script>

<template>
  <div class="grid w-[30rem]">
    <div class="mb-4">
      <p>
        Ingresa las nuevas cantidades para los productos existentes en
        <strong> {{ store.name }}</strong>
      </p>
      <p>Deja <strong>0</strong> para indicar que no hay existencias</p>
    </div>
    <ul class="divide-y px-1">
      <li v-for="product in storeProducts" :key="product.id" class="flex justify-between py-3">
        <span> {{ product.productName }} </span>
        <span>
          <input
            v-model.number.trim="product.quantity"
            type="number"
            class="input input-bordered input-sm"
            min="0"
          />
        </span>
      </li>
    </ul>
    <button
      class="btn btn-sm btn-outline btn-success mt-auto ml-auto"
      :disabled="isLoading"
      @click="saveChanges"
    >
      Guardar
    </button>
  </div>
</template>
