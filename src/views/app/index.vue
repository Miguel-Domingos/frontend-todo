<template>
  <div class="container px-4 mx-auto">
    <Header>
      <template #title> Meus Todos </template>
      <template #routers>
        <RouterLink to="/admin">
          <Button label="admin" severity="secondary" size="small" />
        </RouterLink>
      </template>
    </Header>
    <!-- change here to flex-col on mobile -->
    <div
      class="flex flex-col justify-center w-full gap-4 py-10 md:flex-row lg:gap-8"
    >
      <div
        class="flex flex-col w-full gap-2 p-2 border border-solid sm:p-4 rounded-xl bg-slate-50 dark:border-zinc-900 dark:bg-zinc-800"
        v-for="step in tasks"
        :key="step.label"
      >
        <div class="flex items-center justify-between">
          <div
            class="flex items-center justify-center gap-2 text-lg font-semibold"
          >
            <span class="">{{ step.label }} </span>

            <span class="opacity-75">{{ step.data.length }}</span>
          </div>
          <!-- <Button v-if="step.label == 'Pendente'" icon="pi pi-plus" text /> -->
        </div>
        <div
          v-if="fetchingTasks"
          class="flex items-center justify-center gap-2 opacity-75"
        >
          <i class="pi pi-spin pi-spinner" />
          <span class="">Carregando tarefas</span>
        </div>
        <template v-else>
          <div v-if="isMobile">
            <swiper :slides-per-view="1" :space-between="50">
              <swiper-slide
                v-for="task in step.data"
                v-if="step.data.length > 0"
              >
                <Card :key="task.id" :task @statusUpdated="fetchMyTasks()" />
              </swiper-slide>

              <span v-else class="flex justify-center w-full opacity-75"
                >sem tarefas</span
              >
            </swiper>
          </div>
          <div v-else class="flex flex-col gap-3">
            <Card
              v-for="task in step.data"
              :key="task.id"
              :task
              v-if="step.data.length > 0"
              @statusUpdated="fetchMyTasks()"
            />
            <span v-else class="text-center opacity-75">sem tarefas</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import type { ITask } from "@/types";
import { useWindowSize } from "@vueuse/core";
import { onBeforeMount, reactive, ref, computed, watch } from "vue";
import { Card, Header } from "@/components";
import Button from "primevue/button";

import services from "@/services";
import { useAuthStore } from "@/stores";
import { storeToRefs } from "pinia";
import { useToast } from "primevue/usetoast";

const { width } = useWindowSize();
const fetchingTasks = ref(false);
const isMobile = ref(false);
const toast = useToast();

const { id } = storeToRefs(useAuthStore()).user.value;
interface ITaskGroup {
  label: string;
  data: ITask[];
}

interface ITasks {
  todo: ITaskGroup;
  doing: ITaskGroup;
  done: ITaskGroup;
}

const tasks = reactive<ITasks>({
  todo: {
    label: "Pendente",
    data: [],
  },
  doing: {
    label: "Fazendo",
    data: [],
  },
  done: {
    label: "Feito",
    data: [],
  },
});

async function fetchMyTasks() {
  const response = await services.user.getMyAllTasks(id);
  if (response.data) {
    if (response.data.data.length > 0) {
      tasks.todo.data = [];
      tasks.doing.data = [];
      tasks.done.data = [];
      response.data.data[0].tasks.map((item: ITask) => {
        if (item.status == 0) {
          tasks.todo.data.push(item);
        } else if (item.status == 1) {
          tasks.doing.data.push(item);
        } else {
          tasks.done.data.push(item);
        }
      });
    }
  } else {
    console.log(response.error);
    toast.add({
      severity: "error",
      summary: "erro",
      detail: `Erro ao carregar tarefas de usuário`,
      life: 3000,
    });
  }
}

watch(
  width,
  (newWidth: number, oldWidth: undefined | number) => {
    if ((oldWidth === undefined || oldWidth > 769) && newWidth <= 769) {
      isMobile.value = true;
    } else if (newWidth > 769 && (oldWidth === undefined || oldWidth <= 769)) {
      isMobile.value = false;
    }
  },
  { immediate: true }
);

onBeforeMount(async () => {
  fetchingTasks.value = true;
  await fetchMyTasks();
  fetchingTasks.value = false;
});
</script>
