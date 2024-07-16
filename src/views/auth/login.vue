<template>
  <div class="flex items-center justify-center w-full h-full">
    <div class="absolute top-6 right-6">
      <ToggleTheme />
    </div>
    <div
      class="flex flex-col items-center justify-center gap-4 p-4 border border-solid rounded-lg shadow-md dark:border-zinc-800"
    >
      <Message v-if="loginError" severity="error">{{ loginError }}</Message>
      <div class="flex flex-col w-full">
        <label for="email">Email</label>
        <InputText
          id="email"
          v-model="credentials.email"
          aria-describedby="email-help"
          :invalid="validationErrors?.email?._errors[0]"
        />
        <small id="email-help" class="text-red-500">{{
          validationErrors?.email?._errors[0]
        }}</small>
      </div>

      <div class="flex flex-col w-full gap-2">
        <label for="password">Senha</label>
        <Password
          id="password"
          :feedback="false"
          v-model="credentials.password"
          toggleMask
          :invalid="validationErrors?.password?._errors[0]"
        />
        <small id="email-help" class="text-red-500">{{
          validationErrors?.password?._errors[0]
        }}</small>
      </div>

      <div class="w-full mt-2">
        <Button
          class="w-full !text-white"
          label="Login"
          @click="onLogin()"
          :loading="loading"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ToggleTheme } from "@/components";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Password from "primevue/password";
import Message from "primevue/message";
import { onBeforeMount, reactive, ref, watch } from "vue";
import services from "@/services";
import { AuthSchema, type AuthSchemaTypes } from "@/validators/Auth";
import type { z } from "zod";
import { useAuthStore } from "@/stores";
import router from "@/router";
const credentials = reactive({
  email: "",
  password: "",
});

const loading = ref(false);
const authStore = useAuthStore();
const loginError = ref("");
const validationErrors = ref<z.ZodFormattedError<AuthSchemaTypes> | null>(null);

async function onLogin() {
  loading.value = true;
  const valid = AuthSchema.safeParse(credentials);
  if (valid.success) {
    const response = await services.auth.login(credentials);
    if (response.data) {
      authStore.register(response.data.data);
      router.push("/app");
    } else {
      loginError.value = response.error.message;
    }
  } else {
    validationErrors.value = valid.error.format();
  }
  loading.value = false;
}

watch(credentials, () => {
  if (validationErrors.value) {
    validationErrors.value = null;
  }
});
</script>
