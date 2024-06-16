import { supabase } from '@/lib/supabase'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export enum EVENTS {
  ADD_PRODUCT_TO_STORE = 'ADD_PRODUCT_TO_STORE',
  REMOVE_PRODUCT_FROM_STORE = 'REMOVE_PRODUCT_FROM_STORE',
  UPDATE_PRODUCT_EXISTENCE = 'UPDATE_PRODUCT_EXISTENCE'
}

export const useEventsStore = defineStore('events', () => {
  const TABLE = 'events'

  const events = ref([])

  async function createEvent(type: EVENTS, data: object) {
    switch (type) {
      case EVENTS.UPDATE_PRODUCT_EXISTENCE:
        return await updateProductsExistenceEvent(data)
    }
  }

  async function updateProductsExistenceEvent(data: any) {
    const { error } = await supabase.from(TABLE).insert({
      type: EVENTS.UPDATE_PRODUCT_EXISTENCE,
      data: {
        product: data.productId,
        storeId: data.storeId,
        previous: { quantity: data.previousQuantity },
        current: { quantity: data.quantity || 0 }
      }
    })
    if (error) {
      console.error(error)
    }
    return !!error
  }

  return { createEvent }
})
