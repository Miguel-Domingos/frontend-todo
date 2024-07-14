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
              <span>novo</span>

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

        <Column field="title" header="Titulo" sortable>
          <template #body="{ data }">
            {{ data.title }}
          </template>
        </Column>
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

        <Column header="Estado" field="status" sortable>
          <template #body="{ data }">
            <span>{{ data.status }}</span>
          </template>
        </Column>

        <Column header="Ações" field="actions">
          <template #body="{ data }">
            <div class="flex gap-2">
              <span>editar</span>
              <span>apagar</span>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { AdminLayout } from "@/layouts";

import { ref, onBeforeMount } from "vue";
import { FilterMatchMode } from "@primevue/core/api";
import IconField from "primevue/iconfield";
import InputText from "primevue/inputtext";
import InputIcon from "primevue/inputicon";
import DataTable from "primevue/datatable";

import Column from "primevue/column";
import database from "@/database/tasks.json";

const tasks = ref([]);
const loading = ref(true);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

async function fetchTasks() {
  const response = database;
  if (response) {
    tasks.value = response;
  } else {
    console.log(response);
  }
}

onBeforeMount(async () => {
  loading.value = true;
  await fetchTasks();
  loading.value = false;
});
</script>
