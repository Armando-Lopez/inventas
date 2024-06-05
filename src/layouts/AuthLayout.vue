<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
const user = useUserStore()

const $router = useRouter()

function signOut() {
  user.signOut().then((val) => {
    if (val) {
      $router.push({ name: 'login' })
    }
  })
}
</script>

<template>
  <header class="shadow-md">
    <div class="container mx-auto navbar bg-base-100">
      <div class="flex-1">
        <h1 class="text-3xl text-primary font-medium">Inventas</h1>
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button @click="signOut">Cerrar sesion</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
  <div class="container mx-auto overflow-auto flex-grow grid grid-cols-12 gap-4 p-2">
    <div class="col-span-2 shadow border rounded-md p-3">menu</div>
    <main class="col-span-10 h-full overflow-auto">
      <slot></slot>
    </main>
  </div>
</template>
