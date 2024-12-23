<template>
  <a-config-provider
    :theme="{
      token: {
        borderRadius: 0,
        wireframe: true,
        colorPrimary: 'var(--primary-color)'
      }
    }">
    <MainView></MainView>
  </a-config-provider>
</template>

<script setup lang="ts">
import MainView from './views/main/MainView.vue'
</script>

<style scoped></style>
