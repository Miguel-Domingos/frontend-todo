<template>
  <UseDark v-slot="{ toggleDark }">
    <Button @click="toggleDark()" severity="secondary">
      <i class="pi pi-sun dark:pi-moon"></i>
    </Button>
  </UseDark>
</template>

<script setup lang="ts">
import { UseDark } from "@vueuse/components";
import Button from "primevue/button";
</script>
