import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const isProd = import.meta.env.VITE_ENV === 'prod'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const TABLES = {
  EVENTS: isProd ? 'events' : 'events_test',
  PRODUCTS: isProd ? 'products' : 'products_test',
  STORES: isProd ? 'stores' : 'stores_test',
  STORE_PRODUCTS: isProd ? 'store_products' : 'store_products_test'
}
