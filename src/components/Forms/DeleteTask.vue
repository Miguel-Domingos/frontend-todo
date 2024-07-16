<template>
  <Modal ref="modalRef">
    <template #header>Deletar tarefa</template>
    <div class="flex flex-col w-full gap-2 p-4 text-center">
      <span>
        Você está prestes a eliminar a tarefa <b>{{ task.title }}</b>
      </span>
      <span class="w-full text-center">
        Esta acção não poderá ser revertida
      </span>
    </div>
    <div class="flex justify-end gap-2 mt-4">
      <Button
        type="button"
        size="small"
        label="Cancelar"
        severity="secondary"
        @click="modalRef?.closeModal()"
      ></Button>
      <Button
        class="!text-white"
        label="Apagar"
        size="small"
        severity="danger"
        :loading="loading"
        @click="onDeleteTask()"
      ></Button>
    </div>
  </Modal>

  <Button
    @click="modalRef?.openModal()"
    class="!text-white"
    label="Apagar"
    size="small"
    severity="danger"
  />
  <Toast />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Modal } from "@/components";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

import Button from "primevue/button";
import services from "@/services";
import type { ITask } from "@/types";

const toast = useToast();
const loading = ref(false);
const modalRef = ref<InstanceType<typeof Modal> | null>(null);
const props = defineProps<{ task: ITask }>();
const emit = defineEmits(["delete"]);

async function onDeleteTask() {
  loading.value = true;
  const response = await services.task.delete({ id: props.task.id });
  if (response.data) {
    emit("delete");
    toast.add({
      severity: "success",
      summary: "sucesso",
      detail: `tarefa ${props.task.title} foi deletada com sucesso`,
      life: 3000,
    });
    modalRef.value?.closeModal();
  } else {
    toast.add({
      severity: "error",
      summary: "Erro",
      detail: "Error ao deletar tarefa",
      life: 3000,
    });
  }
  loading.value = false;
}
</script>
