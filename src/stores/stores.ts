import { TABLES, supabase } from '@/lib/supabase'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import type { ProductModel } from './products'
import { EVENTS, useEventsStore } from './events'

export const useStoresStore = defineStore('stores', () => {
  const $eventsStore = useEventsStore()

  const stores = ref<StoreModel[]>([])

  onMounted(getProductsByStore)

  async function addStore(store: StoreToSave) {
    const { data, error } = await supabase.from(TABLES.STORES).insert(store).select()

    if (error) {
      return null
    }
    stores.value.push(...data)
    return data
  }

  async function getProductsByStore() {
    stores.value = []
    const { data, error } = await supabase.from(TABLES.STORES).select(
      `
          *,
          ${TABLES.STORE_PRODUCTS} (
            *,
            ${TABLES.PRODUCTS} (*)
          )
        `
    )

    if (!error) {
      stores.value = data as unknown as StoreModel[]
    }
  }

  async function saveProductsByStore(
    productsByStore: { store_id: number; product_id: number; quantity: number }[]
  ) {
    const { error } = await supabase.from(TABLES.STORE_PRODUCTS).insert(productsByStore)

    if (error) {
      console.error(error)
      return false
    }

    getProductsByStore()

    return true
  }

  async function updateProductsByStore(
    newData: {
      id: number
      storeId: number
      productId: number
      quantity: number
      previousQuantity: number
    }[]
  ) {
    for (const item of newData) {
      if (item.quantity === item.previousQuantity) {
        continue
      }
      if (item.quantity !== item.previousQuantity && item.quantity) {
        const { error } = await supabase
          .from(TABLES.STORE_PRODUCTS)
          .update({ quantity: item.quantity })
          .eq('id', item.id)
        if (error) {
          console.error(error)
          return false
        }
      } else if (!item.quantity || item.quantity === 0) {
        const { error } = await supabase.from(TABLES.STORE_PRODUCTS).delete().eq('id', item.id)
        if (error) {
          console.error(error)
          return false
        }
      }
      await $eventsStore.createEvent(EVENTS.UPDATE_PRODUCT_EXISTENCE, item)
      console.log('dsdss')
    }
    console.log('dsd')
    getProductsByStore()
    console.log('dsd')

    return true
  }

  return { stores, addStore, saveProductsByStore, updateProductsByStore, getProductsByStore }
})

export interface StoreToSave {
  name: string
  description: string
}

export interface StoreModel extends StoreToSave {
  id: number
  created_at: string
  store_products: StoreProductModel[]
}

interface StoreProductModel {
  id: number
  product_id: number
  quantity: number
  store_id: number
  created_at: string
  products: ProductModel
}
