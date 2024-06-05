import { computed, onMounted, reactive } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'

type LoginCred = {
  email: string,
  password: string
}

export const useUserStore = defineStore('user', () => {

  const user = reactive<{ email?: string }>({
    email: ''
  })

  onMounted(async () => {
    const { data } = await supabase.auth.getUser()
    user.email = data.user?.email
  })

  async function signUp(credentials: LoginCred) {
    const { data, error } = await supabase.auth.signUp(credentials)
    if (error) {
      console.error(error);
      return
    }
    return data
  }

  async function signIn(credentials: LoginCred) {
    const { data, error } = await supabase.auth.signInWithPassword(credentials)
    return { data, error }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error);
      return
    }
    return true
  }


  return { user, signUp, signIn, signOut }
})
