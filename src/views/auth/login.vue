<template>
  <div class="w-full h-full flex justify-center items-center">
    <div class="absolute top-6 right-6">
      <ToggleTheme />
    </div>
    <div
      class="flex justify-center gap-4 items-center flex-col p-4 border border-solid rounded-lg shadow-md dark:border-zinc-800"
    >
      <div class="flex w-full flex-col">
        <label for="email">Email</label>
        <InputText
          id="email"
          v-model="credentials.email"
          aria-describedby="mail-help"
        />
      </div>

      <div class="flex w-full flex-col">
        <label for="password">Senha</label>
        <Password
          id="password"
          :feedback="false"
          v-model="credentials.password"
          toggleMask
        />
      </div>

      <Button class="w-full mt-2">
        <span class="text-white">Login</span>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ToggleTheme } from "@/components";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Password from "primevue/password";
import { reactive } from "vue";

const credentials = reactive({
  email: "",
  password: "",
});
</script>
