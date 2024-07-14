<template>
  <div
    class="flex flex-col items-center justify-center w-full h-full gap-4 sm:gap-2"
  >
    <div
      class="flex flex-col items-center justify-center w-full gap-2 sm:gap-4 sm:flex-row"
    >
      <span class="text-5xl font-bold sm:text-6xl">
        4<span class="text-red-500">0</span>4
      </span>
      <span
        class="hidden w-1 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 sm:block"
      ></span>
      <span class="text-lg font-semibold text-center sm:text-xl">
        Esta página não foi encontrada.
      </span>
    </div>
    <RouterLink to="/">
      <Button severity="danger" size="small">
        <span class="font-semibold text-white">Voltar para home</span>
      </Button>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
</script>
