<template>
  <div class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md">
    <div class="flex flex-col flex-1 gap-2">
      <AnimatedPlaceholder class="max-w-[50%]" />
    </div>
    <div class="flex flex-col gap-2">
      <AnimatedPlaceholder class="min-w-[100px]" />
      <AnimatedPlaceholder class="min-w-[50px]" />
    </div>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from "./AnimatedPlaceholder.vue";
</script>
