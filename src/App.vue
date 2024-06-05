<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <Component :is="route.meta.layout">
    <RouterView />
  </Component>
</template>
