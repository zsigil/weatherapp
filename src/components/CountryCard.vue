<template>
  <div
    class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer"
  >
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ country["All"].country }}</h2>
    </div>

    <div class="flex flex-col">
      <p>{{ country["All"].deaths }}/{{ country["All"].population }}</p>
      <p class="text-xl">
        {{
          ((country["All"].deaths / country["All"].population) * 100).toFixed(
            3
          )
        }}%
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  country: {
    type: Object,
    default: () => {},
  },
});
</script>
