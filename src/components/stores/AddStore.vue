<script setup lang="ts">
import AppForm from '@/components/shared/forms/AppForm.vue'
import AppTextField from '@/components/shared/forms/AppTextField.vue'
import AppTextarea from '@/components/shared/forms/AppTextarea.vue'
import { useStoresStore, type StoreToSave } from '@/stores/stores'
import { ref } from 'vue'

const $stores = useStoresStore()
const form = ref()

async function addProduct(values: StoreToSave) {
  await $stores.addStore(values)
  form.value.resetForm()
}
</script>

<template>
  <div class="dropdown dropdown-end">
    <button class="btn btn-primary text-primary-content shadow">
      <span class="material-symbols-outlined"> add </span>
      Registrar bodega
    </button>
    <AppForm
      ref="form"
      v-slot="{ meta: { valid }, isLoading }"
      tabindex="0"
      class="dropdown-content z-20 menu p-10 w-[90vw] max-w-[30rem] shadow-lg border-2 bg-base-200 rounded-box"
      :to-submit="addProduct"
    >
      <div class="grid gap-3">
        <AppTextField name="name" label="Nombre" rules="required" />
        <AppTextarea name="description" label="Descripción" />
        <button type="submit" class="ml-auto mt-7 btn btn-primary" :disabled="!valid || isLoading">
          Guardar
        </button>
      </div>
    </AppForm>
  </div>
</template>
