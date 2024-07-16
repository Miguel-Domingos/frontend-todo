<template>
  <Modal ref="modalRef">
    <template #header>Editar tarefa</template>
    <div class="flex flex-col w-full gap-2">
      <Message class="mt-1" v-if="updateTaskError" severity="error">{{
        updateTaskError
      }}</Message>
      <div class="flex flex-col">
        <label for="title">Título</label>
        <InputText
          :disabled="readOnly"
          id="title"
          size="small"
          v-model="data.title"
          aria-describedby="title-help"
          :invalid="validationErrors?.title?._errors[0]"
        />
        <template v-if="!readOnly">
          <small
            v-if="validationErrors?.title?._errors[0]"
            id="title-help"
            class="text-red-500"
            >{{ validationErrors?.title?._errors[0] }}</small
          >
          <small v-else id="title-help"
            >De um nome para a tarefa que deseja criar
          </small>
        </template>
      </div>

      <div class="flex flex-col">
        <label for="description">Descrição</label>
        <Textarea
          :disabled="readOnly"
          v-model="data.description"
          id="description"
          class="border-opacity-50"
          :invalid="validationErrors?.description?._errors[0]"
        />
        <template v-if="!readOnly">
          <small
            v-if="validationErrors?.description?._errors[0]"
            id="description-help"
            class="text-red-500"
            >{{ validationErrors?.description?._errors[0] }}</small
          >

          <small v-else id="description-help"
            >Escreva uma descrição relativa
          </small>
        </template>
      </div>

      <div class="flex flex-col">
        <label for="assign">Encarregar</label>
        <MultiSelect
          :disabled="readOnly"
          v-model="data.users_id"
          :options="availableUsers"
          optionLabel="name"
          optionValue="id"
          filter
          placeholder="Escolha usuários"
          class="w-full text-sm"
        />
        <template v-if="!readOnly">
          <small
            v-if="validationErrors?.users_id?._errors[0]"
            id="assign-help"
            class="text-red-500"
            >{{ validationErrors?.users_id?._errors[0] }}</small
          >

          <small v-else id="assign-help"
            >Selecione os usuários que vão realizar a tarefa
          </small>
        </template>
      </div>

      <div class="flex flex-col" v-if="readOnly">
        <label for="deadline"> Data de entrega </label>
        <DatePicker
          :disabled="readOnly"
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
        <template v-if="!readOnly">
          <small
            v-if="validationErrors?.deadline?._errors[0]"
            id="deadline-help"
            class="text-red-500"
            >{{ validationErrors?.deadline?._errors[0] }}</small
          >

          <small v-else id="deadline-help">Define o dia de entrega</small>
        </template>
      </div>
      <div class="flex flex-col">
        <label for="status">Estado</label>
        <Select
          v-model="data.status"
          :options="availableStatus"
          optionLabel="label"
          optionValue="value"
          placeholder="Escolha Estado"
          class="w-full text-sm"
        />
      </div>
    </div>
    <div class="flex justify-end gap-2 mt-2">
      <Button
        type="button"
        label="Cancelar"
        severity="secondary"
        @click="modalRef?.closeModal()"
      ></Button>
      <Button
        class="!text-white"
        type="button"
        label="Editar"
        :loading="loading"
        @click="onUpdateTask()"
      ></Button>
    </div>
  </Modal>

  <Button @click="modalRef?.openModal()" size="small" severity="secondary">
    <slot name="button"> Editar </slot>
  </Button>
</template>

<script setup lang="ts">
import { z } from "zod";
import { onBeforeMount, reactive, ref, watch } from "vue";
import { Modal } from "@/components";
import { TaskSchema, type TaskSchemaTypes } from "@/validators/ModalForms";
import Textarea from "primevue/textarea";
import Select from "primevue/select";
import DatePicker from "primevue/datepicker";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import MultiSelect from "primevue/multiselect";
import Message from "primevue/message";
import services from "@/services";
import { useToast } from "primevue/usetoast";
import { useDate } from "@/composables";
import type { ITask } from "@/types";

const modalRef = ref<InstanceType<typeof Modal> | null>(null);
const { FormattedDate } = useDate();
const toast = useToast();
const props = defineProps<{ task: ITask; readOnly: boolean }>();
const emit = defineEmits(["update"]);

const loading = ref(false);
const updateTaskError = ref("");
const availableUsers = ref([]);

const defaultUser = props.task.users.map((data: any) => data.id);
const data = reactive({
  title: props.task.title || "",
  description: props.task.description || "",
  deadline: new Date(props.task.deadline) || "",
  status: props.task.status || 0,
  users_id: defaultUser || [],
});

const validationErrors = ref<z.ZodFormattedError<TaskSchemaTypes> | null>(null);
const availableStatus = ref([
  {
    label: "Pendente",
    value: 0,
  },
  {
    label: "Fazendo",
    value: 1,
  },
  {
    label: "Feito",
    value: 2,
  },
]);

async function onUpdateTask() {
  const isFormValid = TaskSchema.safeParse(data);
  if (isFormValid.success) {
    loading.value = true;

    const response = await services.task.update(
      { id: props.task.id },
      {
        ...data,
        deadline: FormattedDate(data.deadline),
      }
    );
    if (response.data) {
      emit("update");
      toast.add({
        severity: "success",
        summary: "sucesso",
        detail: `tarefa ${props.task.id} foi atualizada com sucesso`,
        life: 3000,
      });
      modalRef.value?.closeModal();
    } else {
      updateTaskError.value = response.error.message;
      toast.add({
        severity: "error",
        summary: "Erro",
        detail: "Error ao atualizar tarefa",
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
