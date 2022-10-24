<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        v-model="searchQuery"
        @input="getSearchResults"
        type="text"
        name=""
        id=""
        placeholder="Search for a country..."
        class="py-2 px-1 bg-transparent w-full border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <ul
        v-if="searchResults"
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
      >
        <li v-for="(sR, i) in searchResults" key="i">
          {{ sR.name.official }} - {{ sR.capital[0] }}
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const searchQuery = ref("");
const queryTimeout = ref(null);
const searchResults = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);

  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value) {
      const result = await axios.get(
        `https://restcountries.com/v3.1/name/${searchQuery.value}`
      );
      searchResults.value = result.data;
      console.log(searchResults.value);
      return;
    }
    searchResults.value = null;
  }, 300);
};
</script>
