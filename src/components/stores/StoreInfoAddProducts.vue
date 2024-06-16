<script setup lang="ts">
import { useProductsStore, type ProductModel } from '@/stores/products'
import { useStoresStore, type StoreModel } from '@/stores/stores'
import { computed, ref } from 'vue'

const $productsStore = useProductsStore()
const $storesStore = useStoresStore()

const props = defineProps<{
  store: StoreModel
}>()

const productSearch = ref('')
const isSaving = ref(false)
const filteredProducts = computed(() => {
  const allProducts = $productsStore.products.filter((product) =>
    product.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .includes(productSearch.value.toLowerCase())
  )
  const noEXistingProducts = allProducts.filter(
    (product) =>
      !props.store.store_products.some((storeProduct) => storeProduct.product_id === product.id)
  )
  return noEXistingProducts
})
const selectedProductsToAdd = ref<
  {
    store_id: number
    product: {
      id: number
      name: string
      code: string
    }
    quantity: number
  }[]
>([])
const hasProductsToAdd = computed(() => !!selectedProductsToAdd.value.length)

function handleAddProduct(product: ProductModel, quantity: number) {
  if (quantity < 0) {
    return
  }
  const productInSelection = selectedProductsToAdd.value.find((p) => p.product.id === product.id)
  if (!productInSelection && quantity > 0) {
    selectedProductsToAdd.value.push({
      store_id: props.store.id,
      quantity: quantity,
      product
    })
  } else if (productInSelection && quantity > 0) {
    productInSelection.quantity = quantity
  } else if (productInSelection && quantity <= 0) {
    selectedProductsToAdd.value = selectedProductsToAdd.value.filter(
      (p) => p.product.id !== product.id
    )
  }
}

async function saveAddProducts() {
  isSaving.value = true
  const dataToSave = selectedProductsToAdd.value.map((product) => ({
    store_id: product.store_id,
    product_id: product.product.id,
    quantity: product.quantity
  }))
  const success = await $storesStore.saveProductsByStore(dataToSave)
  if (success) {
    $storesStore.getProductsByStore()
  }
  isSaving.value = false
}
</script>

<template>
  <div class="grid grid-cols-2 gap-4 w-[45rem]">
    <div class="col-span-full">
      <p>
        Ingresar productos en la bodega <strong> {{ store.name }}</strong>
      </p>
      <p>Escribe cuantas unidades entran de cada producto</p>
    </div>
    <div>
      <div class="grid gap-1 mb-3">
        <div class="flex justify-between items-center">
          <span>Filtra por nombre</span>
        </div>
        <input
          v-model="productSearch"
          id="product-name"
          type="text"
          class="input input-bordered input-sm"
        />
      </div>
      <ul class="grid divide-y">
        <li v-for="product of filteredProducts" :key="product.id">
          <div class="flex justify-between flex-row py-2 cursor-default">
            {{ product.name }} - {{ product.code }}
            <input
              type="number"
              placeholder="¿Cuántos?"
              class="input input-bordered input-sm w-32"
              min="0"
              :value="selectedProductsToAdd.find((p) => p.product.id === product.id)?.quantity"
              @input="handleAddProduct(product, Number(($event.target as HTMLInputElement).value || 0))"
            />
          </div>
        </li>
      </ul>
    </div>
    <div class="flex flex-col">
      <p class="flex-grow-0 mb-1">Resumen:</p>
      <ul class="flex-grow flex flex-col divide-y">
        <li
          v-for="product in selectedProductsToAdd"
          :key="product.product.id"
          class="flex justify-between py-2"
        >
          <span> {{ product.product.name }} - {{ product.product.code }} </span>
          <strong>
            {{ product.quantity }}
          </strong>
        </li>
      </ul>
      <button
        class="btn btn-sm btn-outline btn-success mt-auto ml-auto"
        :disabled="!hasProductsToAdd || isSaving"
        @click="saveAddProducts"
      >
        Guardar
      </button>
    </div>
  </div>
</template>
