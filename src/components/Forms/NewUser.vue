<template>
  <Modal ref="modalRef">
    <template #header>Criar novo usuário</template>
    <div class="flex flex-col w-full gap-3">
      <Message class="mt-1" v-if="newUserError" severity="error">{{
        newUserError
      }}</Message>

      <div class="flex flex-col">
        <label for="title">Nome</label>
        <InputText
          id="name"
          size="small"
          v-model="data.name"
          :invalid="validationErrors?.name?._errors[0]"
        />
        <small id="name-help" class="text-red-500">{{
          validationErrors?.name?._errors[0]
        }}</small>
      </div>

      <div class="flex flex-col">
        <label for="description">Email</label>
        <InputText
          v-model="data.email"
          size="small"
          id="email"
          type="email"
          :invalid="validationErrors?.email?._errors[0]"
        />
        <small id="email-help" class="text-red-500">{{
          validationErrors?.email?._errors[0]
        }}</small>
      </div>
      <div class="flex flex-col gap-2">
        <label for="password">Password</label>
        <div class="w-full text-sm">
          <Password
            size="small"
            id="password"
            class="w-full *:w-full"
            :feedback="false"
            toggleMask
            v-model="data.password"
            :invalid="validationErrors?.password?._errors[0]"
          />
          <small id="password-help" class="text-red-500">{{
            validationErrors?.password?._errors[0]
          }}</small>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex gap-2">
          <Checkbox v-model="data.admin" id="admin" :binary="true" />
          <label for="admin">Criar como admin</label>
        </div>
        <small id="admin-help">Selecione para criar o usuário com admin</small>
      </div>
      <div class="flex justify-end gap-2 mt-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="modalRef?.closeModal()"
        ></Button>
        <Button
          type="button"
          label="Criar"
          class="!text-white"
          :loading="loading"
          @click="onCreateUser()"
        ></Button>
      </div>
    </div>
  </Modal>

  <Button
    @click="modalRef?.openModal()"
    class="!text-white"
    label="Criar usuário"
    severity="info"
    size="small"
  />
</template>

<script setup lang="ts">
import { z } from "zod";
import { reactive, ref, watch } from "vue";
import { Modal } from "@/components";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Message from "primevue/message";
import services from "@/services";
import { useToast } from "primevue/usetoast";
import { UserSchema, type UserSchemaTypes } from "@/validators/ModalForms";

const modalRef = ref<InstanceType<typeof Modal> | null>(null);
const loading = ref(false);
const toast = useToast();

const data = reactive({
  name: "",
  email: "",
  password: "",
  admin: false,
});

const emit = defineEmits(["create"]);

const validationErrors = ref<z.ZodFormattedError<UserSchemaTypes> | null>(null);
const newUserError = ref("");

async function onCreateUser() {
  const isFormValid = UserSchema.safeParse(data);
  if (isFormValid.success) {
    loading.value = true;
    const response = await services.user.create(data);
    if (response.data) {
      emit("create");
      toast.add({
        severity: "success",
        summary: "sucesso",
        detail: `usuário ${data.name} foi criado com sucesso`,
        life: 3000,
      });
      modalRef.value?.closeModal();
    } else {
      newUserError.value = response.error.message;
      toast.add({
        severity: "error",
        summary: "Erro",
        detail: "Error ao criar usuário",
        life: 3000,
      });
    }
  } else {
    validationErrors.value = isFormValid.error.format();
  }
  loading.value = false;
}

watch(data, () => {
  if (validationErrors.value) {
    validationErrors.value = null;
  }
});
</script>
