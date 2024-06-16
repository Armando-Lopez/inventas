import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { TABLES, supabase } from '@/lib/supabase'

export interface ProductToSave {
  code: string
  name: string
  description: string
}
export interface ProductModel extends ProductToSave {
  id: number
  created_at: string
}

export const useProductsStore = defineStore('products', () => {

  const products = ref<ProductModel[]>([])

  onMounted(async () => {
    const { data, error } = await supabase
      .from(TABLES.PRODUCTS)
      .select()

    if (!error) {
      products.value = data as ProductModel[]
    }

  })

  async function addProduct(product: ProductToSave) {
    const { data, error } = await supabase
      .from(TABLES.PRODUCTS)
      .insert(product)
      .select()

    if (error) {
      return null
    }
    products.value.push(...data)
    return data
  }

  return { products, addProduct }
})
