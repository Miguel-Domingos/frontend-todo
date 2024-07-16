<template>
  <Dialog v-model:visible="visible" modal class="w-full max-w-sm">
    <template #header>
      <slot name="header" />
    </template>
    <slot />
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from "primevue/dialog";
import { ref } from "vue";
const visible = ref(false);

function openModal() {
  visible.value = true;
}

function closeModal() {
  visible.value = false;
}

defineExpose({ openModal, closeModal });
</script>
