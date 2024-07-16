<template>
  <Modal ref="modalRef">
    <template #header>Criar nova tarefa</template>
    <div class="flex flex-col w-full gap-2">
      <Message class="mt-1" v-if="newTaskError" severity="error">{{
        newTaskError
      }}</Message>
      <div class="flex flex-col">
        <label for="title">Título</label>
        <InputText
          id="title"
          size="small"
          v-model="data.title"
          aria-describedby="title-help"
          :invalid="validationErrors?.title?._errors[0]"
        />

        <small
          v-if="validationErrors?.title?._errors[0]"
          id="title-help"
          class="text-red-500"
          >{{ validationErrors?.title?._errors[0] }}</small
        >
        <small v-else id="title-help"
          >De um nome para a tarefa que deseja criar
        </small>
      </div>

      <div class="flex flex-col">
        <label for="description">Descrição</label>
        <Textarea
          v-model="data.description"
          id="description"
          class="border-opacity-50"
          :invalid="validationErrors?.description?._errors[0]"
        />
        <small
          v-if="validationErrors?.description?._errors[0]"
          id="description-help"
          class="text-red-500"
          >{{ validationErrors?.description?._errors[0] }}</small
        >

        <small v-else id="description-help"
          >Escreva uma descrição relativa
        </small>
      </div>

      <div class="flex flex-col">
        <label for="assign">Encarregar</label>
        <MultiSelect
          v-model="data.users_id"
          :options="availableUsers"
          optionLabel="name"
          optionValue="id"
          filter
          placeholder="Escolha usuários"
          class="w-full text-sm"
        />
        <small
          v-if="validationErrors?.users_id?._errors[0]"
          id="assign-help"
          class="text-red-500"
          >{{ validationErrors?.users_id?._errors[0] }}</small
        >

        <small v-else id="assign-help"
          >Selecione os usuários que vão realizar a tarefa
        </small>
      </div>

      <div class="flex flex-col">
        <label for="deadline"> Data de entrega </label>
        <DatePicker
          dateFormat="yy/mm/dd"
          v-model="data.deadline"
          id="deadline"
          showIcon
          fluid
          size="small"
          iconDisplay="input"
          inputId="icondisplay"
          class="text-sm"
          :invalid="validationErrors?.deadline?._errors[0]"
        />
        <small
          v-if="validationErrors?.deadline?._errors[0]"
          id="deadline-help"
          class="text-red-500"
          >{{ validationErrors?.deadline?._errors[0] }}</small
        >

        <small v-else id="deadline-help">Define o dia de entrega</small>
      </div>
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Cancelar"
        severity="secondary"
        @click="modalRef?.closeModal()"
      ></Button>
      <Button
        type="button"
        class="!text-white"
        label="Criar"
        :loading="loading"
        @click="onCreateTask()"
      ></Button>
    </div>
  </Modal>

  <Button
    @click="modalRef?.openModal()"
    label="Criar tarefa"
    class="!text-white"
    severity="info"
    size="small"
  />
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref, watch } from "vue";
import { z } from "zod";
import { Modal } from "@/components";

import Textarea from "primevue/textarea";
import DatePicker from "primevue/datepicker";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import MultiSelect from "primevue/multiselect";
import { TaskSchema, type TaskSchemaTypes } from "@/validators/ModalForms";
import Message from "primevue/message";
import services from "@/services";
import { useToast } from "primevue/usetoast";
import { useDate } from "@/composables";

const modalRef = ref<InstanceType<typeof Modal> | null>(null);
const { FormattedDate } = useDate();
const data = reactive({
  title: "",
  description: "",
  deadline: new Date(new Date().setDate(new Date().getDate() + 1)),
  users_id: [],
});

const toast = useToast();
const loading = ref(false);
const emit = defineEmits(["create"]);
const newTaskError = ref("");

const availableUsers = ref([]);

const validationErrors = ref<z.ZodFormattedError<TaskSchemaTypes> | null>(null);

async function onCreateTask() {
  const isFormValid = TaskSchema.safeParse(data);
  if (isFormValid.success) {
    loading.value = true;

    const response = await services.task.create({
      ...data,
      deadline: FormattedDate(data.deadline),
    });
    if (response.data) {
      data.title = "";
      data.description = "";
      data.deadline = new Date(new Date().setDate(new Date().getDate() + 1));
      data.users_id = [];

      emit("create");
      toast.add({
        severity: "success",
        summary: "sucesso",
        detail: `tarefa ${data.title} foi criada com sucesso`,
        life: 3000,
      });
      modalRef.value?.closeModal();
    } else {
      newTaskError.value = response.error.message;
      toast.add({
        severity: "error",
        summary: "Erro",
        detail: "Error ao criar tarefa",
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

onBeforeMount(async () => {
  const response = await services.user.getAllMininal();
  if (response.data) {
    availableUsers.value = response.data.data;
  } else {
    console.log(response.error);
  }
});
</script>
