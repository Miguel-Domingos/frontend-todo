<template>
  <Modal ref="modalRef">
    <template #header>Vizualizar tarefa</template>
    <div class="flex flex-col w-full gap-2">
      <Message class="mt-1" v-if="updateTaskError" severity="error">{{
        updateTaskError
      }}</Message>
      <div class="flex flex-col">
        <label for="title">Título</label>
        <InputText
          id="title"
          size="small"
          v-model="data.title"
          aria-describedby="title-help"
          disabled
        />

        <small id="title-help"
          >De um nome para a tarefa que deseja criar
        </small>
      </div>

      <div class="flex flex-col">
        <label for="description">Descrição</label>
        <Textarea
          v-model="data.description"
          id="description"
          class="border-opacity-50"
          disabled
        />

        <small id="description-help">Escreva uma descrição relativa </small>
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
          disabled
        />

        <small id="assign-help"
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
          disabled
        />

        <small id="deadline-help">Define o dia de entrega</small>
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
        v-if="props.task.status"
        type="button"
        label="Marcar como feita"
        :loading="loading"
        @click="onUpdateTask(0)"
      ></Button>
      <Button
        v-else
        type="button"
        label="Marcar como pendente"
        :loading="loading"
        @click="onUpdateTask(1)"
      />
    </div>
  </Modal>

  <Button
    @click="modalRef?.openModal()"
    size="small"
    icon="pi pi-ellipsis-h"
    severity="secondary"
  />
  <Toast />
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import { Modal } from "@/components";

import Textarea from "primevue/textarea";
import DatePicker from "primevue/datepicker";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import MultiSelect from "primevue/multiselect";
import Message from "primevue/message";
import services from "@/services";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { useDate } from "@/composables";

const modalRef = ref<InstanceType<typeof Modal> | null>(null);

const toast = useToast();
const props = defineProps(["task"]);
const emit = defineEmits(["status:update"]);
const { FormattedDate } = useDate();

const loading = ref(false);
const updateTaskError = ref("");

const defaultUser = props.task.users.map((data: any) => data.id);
const availableUsers = ref(props.task.users);
const data = reactive({
  title: props.task.title || "",
  description: props.task.description || "",
  deadline: new Date(props.task.deadline) || "",
  users_id: defaultUser || [],
});

async function onUpdateTask(status: number) {
  loading.value = true;
  const response = await services.task.update(props.task.id, {
    ...data,
    deadline: FormattedDate(data.deadline),
    status: status,
  });

  if (response.data) {
    emit("status:update");
    toast.add({
      severity: "success",
      summary: "sucesso",
      detail: `estado de ${props.task.title} foi atualizada com sucesso`,
      life: 3000,
    });
    modalRef.value?.closeModal();
  } else {
    toast.add({
      severity: "error",
      summary: "Erro",
      detail: "Error ao atualizar estado",
      life: 3000,
    });
  }
  loading.value = false;
}
</script>
