<template></template>

<script setup lang="ts">
import { useAuthStore } from "@/stores";
import { onBeforeMount } from "vue";

onBeforeMount(() => {
  useAuthStore().reset();
});
</script>
