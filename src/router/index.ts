import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import OnboardingLayout from '@/layouts/OnboardingLayout.vue'
import { supabase } from '@/lib/supabase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      meta: {
        layout: OnboardingLayout,
      },
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/productos',
      name: 'products',
      meta: {
        layout: AuthLayout,
      },
      component: () => import('../views/ProductsView.vue')
    },
    {
      path: '/bodegas',
      name: 'stores',
      meta: {
        layout: AuthLayout,
      },
      component: () => import('../views/StoresView.vue')
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  const { data } = await supabase.auth.getUser()
  if (!data.user?.id && to.name !== 'login') {
    next({ name: 'login' })
  }
  next()
})

export default router
