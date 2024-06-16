<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
const $user = useUserStore()
const $router = useRouter()
const $route = useRoute()

const isShowingMenu = ref(false)

function toggleMenu () {
  isShowingMenu.value = !isShowingMenu.value
}

watch(() => $route.fullPath, toggleMenu)

function signOut() {
  $user.signOut().then((val) => {
    if (val) {
      $router.push({ name: 'login' })
    }
  })
}
</script>

<template>
  <header class="shadow-md">
    <div class="container mx-auto navbar bg-base-100">
      <button @click="toggleMenu" class="lg:hidden">
        <span class="material-symbols-outlined"> menu </span>
      </button>
      <div class="flex-1">
        <h1 class="text-3xl text-primary font-medium"></h1>
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar placeholder">
            <div class="w-10 bg-neutral text-neutral-content rounded-full">
              <span v-if="$user.user.email">{{ $user.user.email[0].toUpperCase() }}</span>
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button @click="signOut">Cerrar sesion</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
  <div class="container mx-auto overflow-auto flex-grow grid grid-cols-12 gap-3 p-2">
    <ul
      class="menu fixed lg:relative z-10 h-full w-[95%] col-span-2 gap-2 bg-base-200 shadow border rounded-md p-3"
      :class="{ '-translate-x-full lg:translate-x-0 -left-6 lg:left-0': !isShowingMenu }"
    >
      <li>
        <RouterLink :to="{ name: 'products' }" active-class="active">
          <span class="material-symbols-outlined"> package_2 </span>
          Productos
        </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'stores' }" active-class="active">
          <span class="material-symbols-outlined"> storefront </span>
          Bodegas
        </RouterLink>
      </li>
    </ul>
    <main class="col-span-full lg:col-span-10 h-full overflow-auto px-4">
      <slot></slot>
    </main>
  </div>
</template>
