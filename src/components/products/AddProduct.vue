<script setup lang="ts">
import AppForm from '@/components/forms/AppForm.vue'
import AppTextField from '@/components/forms/AppTextField.vue'
import AppTextarea from '@/components/forms/AppTextarea.vue'
import { useProductsStore } from '@/stores/products'
import { ref } from 'vue'

const $products = useProductsStore()
const closeBtn = ref<HTMLButtonElement>()

async function addProduct(values: any) {
  await $products.addProduct(values)
  closeBtn.value?.click()
}
</script>

<template>
  <button class="btn btn-primary text-primary-content" onclick="app_product.showModal()">
    Agregar producto
  </button>
  <dialog id="app_product" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button ref="closeBtn" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h3 class="mb-3 font-bold text-lg">Agregar producto</h3>
      <AppForm v-slot="{ meta: { valid }, isLoading }" :to-submit="addProduct">
        <div class="grid gap-3">
          <AppTextField name="name" label="Nombre" rules="required" />
          <AppTextField name="code" label="Código" rules="required" />
          <AppTextarea name="description" label="Descripción" />
          <button
            type="submit"
            class="ml-auto mt-7 btn btn-primary"
            :disabled="!valid || isLoading"
          >
            Guardar
          </button>
        </div>
      </AppForm>
    </div>
  </dialog>
</template>
