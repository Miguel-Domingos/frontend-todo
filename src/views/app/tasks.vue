<template>
  <AdminLayout>
    <div class="w-full">
      <DataTable
        class="overflow-hidden border border-solid rounded-lg dark:border-zinc-800"
        showGridlines
        v-model:filters="filters"
        :value="tasks"
        paginator
        removableSort
        :rows="5"
        :rowsPerPageOptions="[3, 5, 10]"
        dataKey="id"
        :loading="loading"
      >
        <template #header>
          <div class="flex flex-col w-full gap-2">
            <div class="flex flex-col w-full">
              <span class="text-3xl font-semibold">Tarefas</span>
            </div>
            <div class="flex items-center justify-between mt-1">
              <div class="flex gap-2">
                <Button
                  icon="pi pi-external-link"
                  label="Exportar"
                  severity="contrast"
                  size="small"
                  @click="ExportTaskTable(tasks)"
                />
                <NewTask @create="fetchTasks()" />
              </div>

              <IconField>
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText
                  size="small"
                  v-model="filters['global'].value"
                  placeholder="pesquisar"
                />
              </IconField>
            </div>
          </div>
        </template>
        <template #empty> Nenhuma tarefa encontrado </template>
        <template #loading> Carregado tarefas </template>
        <Column field="id" header="ID" sortable />

        <Column field="title" header="Titulo" sortable />

        <Column header="Descrição" field="description" sortable>
          <template #body="{ data }">
            <span class="line-clamp-2">{{ data.description }}</span>
          </template>
        </Column>
        <Column header="Entrega" field="deadline" sortable>
          <template #body="{ data }">
            <span>{{ data.deadline }}</span>
          </template>
        </Column>
        <Column header="Encarregado" field="users" sortable>
          <template #body="{ data }">
            <div class="flex justify-center gap-1">
              <span
                class="text-sm"
                v-for="user in data.users"
                :title="user.name"
                >{{ user.name.split(" ")[0] }},
              </span>
            </div>
          </template>
        </Column>

        <Column header="Estado" field="status" sortable>
          <template #body="{ data }">
            <span>{{ taskStatus[data.status] }}</span>
          </template>
        </Column>

        <Column header="Ações" field="actions">
          <template #body="{ data }">
            <div class="flex gap-2">
              <EditTask :readOnly="false" :task="data" @update="fetchTasks()" />
              <DeleteTask :task="data" @delete="fetchTasks()" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { AdminLayout } from "@/layouts";
import { EditTask, DeleteTask, NewTask } from "@/components/Forms";
import { ref, onBeforeMount } from "vue";
import { FilterMatchMode } from "@primevue/core/api";
import Button from "primevue/button";
import IconField from "primevue/iconfield";
import InputText from "primevue/inputtext";
import InputIcon from "primevue/inputicon";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import type { ITask } from "@/types";
import services from "@/services";
import { useToast } from "primevue/usetoast";
import { ExportTaskTable } from "@/helpers";

const tasks = ref<ITask[] | []>([]);
const taskStatus = ["Pendente", "Fazendo", "Feito"];
const loading = ref(true);
const toast = useToast();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

async function fetchTasks() {
  const response = await services.task.getAll();
  if (response.data) {
    tasks.value = response.data.data;
  } else {
    console.log(response.error);
    toast.add({
      severity: "error",
      summary: "erro",
      detail: `Erro ao carregar usuários`,
      life: 3000,
    });
  }
}

onBeforeMount(async () => {
  loading.value = true;
  await fetchTasks();
  loading.value = false;
});
</script>
