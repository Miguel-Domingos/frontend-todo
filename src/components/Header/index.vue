<template>
  <div class="flex items-center justify-between w-full py-4">
    <div class="flex items-center gap-2">
      <span class="text-lg font-bold sm:text-2xl">
        <slot name="title" />
      </span>
      <div v-if="user.admin" class="flex items-center justify-center gap-1">
        <slot name="routers" />
      </div>
    </div>

    <div class="flex items-center gap-2">
      <ToggleTheme />

      <RouterLink to="/logout" v-if="token">
        <Button severity="danger" size="small">
          <span class="text-white">sair</span>
        </Button>
      </RouterLink>
    </div>
  </div>
  <hr class="dark:border-zinc-900" />
</template>

<script setup lang="ts">
import { ToggleTheme } from "@/components";
import { useAuthStore } from "@/stores";
import Button from "primevue/button";

const { token, user } = useAuthStore();
</script>
