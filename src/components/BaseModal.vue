<template>
  <div
    v-show="modalActive"
    class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8"
  >
    <div
      v-if="modalActive"
      class="self-start p-4 bg-white mt-32 max-w-screen-md"
    >
      <slot />
      <button
        @click="$emit('close-modal')"
        class="mt-8 py-2 px-6 text-white bg-weather-primary"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
defineEmits(["close-modal"]);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped></style>
