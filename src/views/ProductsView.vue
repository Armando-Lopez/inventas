<script setup lang="ts">
import { useProductsStore } from '@/stores/products'
import AppProduct from '@/components/products/AddProduct.vue'
const $productsStore = useProductsStore()
</script>

<template>
  <section>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-medium">Productos</h1>
      <AppProduct />
    </div>
    <div>
      <div class="overflow-x-auto shadow-md border rounded-lg">
        <table class="table table-zebra table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <td>#</td>
              <td>Nombre</td>
              <td>Código</td>
              <td>Descripción</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in $productsStore.products" :key="product.id">
              <td>{{ index + 1 }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.code }}</td>
              <td>{{ product.description || '---' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
