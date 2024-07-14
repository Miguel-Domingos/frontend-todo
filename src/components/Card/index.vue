<template>
  <Card
    v-bind="$attrs"
    :key="task.id"
    class="w-full border border-solid cursor-pointer select-none dark:border-zinc-900"
  >
    <template #title>
      <span class="font-bold"> {{ task.title }} </span>
    </template>
    <template #content>
      <div class="flex flex-col gap-2 full">
        <div class="w-full p-0 -mt-2 line-clamp-1">
          <span class="font-semibold opacity-85">
            {{ task.description }}
          </span>
        </div>
        <div class="flex flex-col w-full gap-1">
          <div class="flex justify-between w-full">
            <span
              class="flex items-center justify-center gap-1 text-sm opacity-50"
            >
              <span class="pi pi-list" style="font-size: 0.75rem"></span>
              Progresso
            </span>
            <span class="text-sm font-bold"
              >{{ calculateProgress(task.status) }}%</span
            >
          </div>
          <div class="w-full h-1 rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              :class="`${progressBars[task.status]} ${
                progressColors[task.status]
              }`"
              class="h-full rounded-full"
            ></div>
          </div>
        </div>
        <div class="w-full">
          <Tag class="!text-xs">entrega: {{ task.deadline }} </Tag>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from "primevue/card";
import Tag from "primevue/tag";

interface ITask {
  id: number;
  title: string;
  description: string;
  deadline: Date | string;
  status: 0 | 1 | 2;
}

const progressColors = ["", "bg-blue-500", "bg-green-500"];
const progressBars = ["w-0", "w-[50%]", "w-full"];
function calculateProgress(status: number) {
  if (status == 0) return 0;
  else if (status == 1) return 50;
  return 100;
}

defineProps<{ task: ITask }>();
</script>
