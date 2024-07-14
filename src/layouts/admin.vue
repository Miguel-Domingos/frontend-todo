<template>
  <div class="container px-4 mx-auto">
    <Header>
      <template #title> Área administrativa </template>
      <template #routers>
        <RouterLink to="/">
          <Button label="todos" severity="secondary" size="small" />
        </RouterLink>
      </template>
    </Header>
    <div class="w-full h-full">
      <div class="flex items-center justify-center w-full gap-2 my-4">
        <RouterLink to="/admin/users">
          <Button label="usuários" severity="secondary" />
        </RouterLink>
        <span class="text-slate-100 dark:text-zinc-800">|</span>
        <RouterLink to="/admin/tasks">
          <Button label="tarefas" severity="secondary" />
        </RouterLink>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Header } from "@/components";
import Button from "primevue/button";
</script>
