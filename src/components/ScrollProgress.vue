<script setup lang="ts">
import { useScroll } from "@vueuse/core";
import { computed } from "vue";

const { y } = useScroll(window);

const progress = computed(() => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  if (height <= 0) return 0;
  return (y.value / height) * 100;
});
</script>

<template>
  <div
    id="scroll-progress"
    class="linear left-0 z-9999 h-1 w-0 bg-blue-500 transition-[width]"
    :style="{ width: progress + '%' }"
  />
</template>
