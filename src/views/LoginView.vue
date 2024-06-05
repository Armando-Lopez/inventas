<script setup lang="ts">
import AppTextField from '@/components/forms/AppTextField.vue'
import AppForm from '@/components/forms/AppForm.vue'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const $router = useRouter()
const $user = useUserStore()

const loginType = ref<'signIn' | 'signUp'>('signIn')

async function createAccount(data: any) {
  const success = await $user.signUp(data)
  if (success) {
    $router.push({ name: 'products' })
  }
}

async function signIn(data: any) {
  const { error } = await $user.signIn(data)
  if (error) {
    if (error.message === 'Invalid login credentials') {
      alert('Credenciales invalidas, verifica los datos')
    }
    return
  }
  $router.push({ name: 'products' })
}
</script>

<template>
  <section class="w-screen h-screen grid place-items-center">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <div>
          <div role="tablist" class="tabs tabs-lifted">
            <button
              role="tab"
              class="tab"
              :class="{ 'tab-active': loginType === 'signIn' }"
              @click="loginType = 'signIn'"
            >
              Iniciar sesión
            </button>
            <button
              role="tab"
              class="tab"
              :class="{ 'tab-active': loginType === 'signUp' }"
              @click="loginType = 'signUp'"
            >
              Crear cuenta
            </button>
          </div>
          <AppForm
            v-if="loginType === 'signIn'"
            v-slot="{ isLoading }"
            class="grid gap-3 p-4 border-x border-b rounded-b-lg"
            autocomplete="on"
            :to-submit="signIn"
          >
            <AppTextField name="email" label="Correo electronico" rules="required|email" />
            <AppTextField name="password" type="password" label="Contraseña" rules="required" />
            <button class="btn btn-primary" :disabled="isLoading">
              <span v-if="isLoading" class="loading loading-spinner"></span>
              Iniciar sesión
            </button>
          </AppForm>
          <AppForm
            v-if="loginType === 'signUp'"
            v-slot="{ isLoading }"
            class="grid gap-3 p-4 border-x border-b rounded-b-lg"
            autocomplete="off"
            :to-submit="createAccount"
          >
            <AppTextField name="email" label="Correo electronico" rules="required|email" />
            <AppTextField name="password" type="password" label="Contraseña" rules="required" />
            <AppTextField
              name="confirmation"
              type="password"
              label="Confirmar contraseña"
              rules="required|confirmed:@password"
            />
            <button class="btn btn-primary" :disabled="isLoading">
              <span v-if="isLoading" class="loading loading-spinner"></span>
              Crear cuenta
            </button>
          </AppForm>
        </div>
      </div>
    </div>
  </section>
</template>
