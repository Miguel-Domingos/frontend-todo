<template>
  <AdminLayout>
    <div class="w-full">
      <DataTable
        ref="DataTableRef"
        class="overflow-hidden border border-solid rounded-lg dark:border-zinc-800"
        showGridlines
        v-model:filters="filters"
        :value="users"
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
              <span class="text-3xl font-semibold">Usuários</span>
            </div>
            <div class="flex items-center justify-between mt-1">
              <div class="flex gap-2">
                <Button
                  icon="pi pi-external-link"
                  label="Exportar"
                  size="small"
                  @click="exportCSV"
                  class="!text-white"
                />
                <NewUser @create="fetchUsers()" />
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

        <Column field="name" header="Nome" sortable />
        <Column field="email" header="Email" sortable />

        <Column header="Admin" field="admin" sortable>
          <template #body="{ data }">
            {{ data.admin ? "Sim" : "Não" }}
          </template>
        </Column>

        <Column header="Data de Criação" field="created_at" sortable>
          <template #body="{ data }">
            {{ FormattedDate(data.created_at) }}
          </template>
        </Column>
      </DataTable>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { AdminLayout } from "@/layouts";
import { NewUser } from "@/components/Forms";
import { ref, onBeforeMount } from "vue";
import { FilterMatchMode } from "@primevue/core/api";
import IconField from "primevue/iconfield";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputIcon from "primevue/inputicon";
import DataTable from "primevue/datatable";
import { useDate } from "@/composables";
import Column from "primevue/column";
import type { IUser } from "@/types";
import services from "@/services";
const { FormattedDate } = useDate();
const users = ref<IUser[] | []>([]);
const loading = ref(true);
const toast = useToast();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

async function fetchUsers() {
  const response = await services.user.getAll();
  if (response.data) {
    users.value = response.data.data;
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

const DataTableRef = ref();
function exportCSV() {
  DataTableRef.value.exportCSV();
}

onBeforeMount(async () => {
  loading.value = true;
  await fetchUsers();
  loading.value = false;
});
</script>
