<script setup lang="ts">
import "primeicons/primeicons.css";
import { RouterView } from "vue-router";
import Toast from "primevue/toast";
</script>

<template>
  <div class="w-full h-full">
    <RouterView />
  </div>
  <Toast />
</template>

<style scoped></style>
