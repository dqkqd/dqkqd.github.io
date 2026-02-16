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
  <div id="scroll-progress" :style="{ width: progress + '%' }" />
</template>

<style scoped>
#scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  width: 0%;
  background: currentcolor;
  transition: width 0.1s ease;
  color: #7287fd;
}
</style>
