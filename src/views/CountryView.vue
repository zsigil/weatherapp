<template>
  <div>
    <Suspense>
      <AsyncCountryView />
      <template #fallback>
        <div class="text-center text-white pt-16">Loading...</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCountryView from "../components/AsyncCountryView.vue";
</script>
