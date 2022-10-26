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
        <p v-if="searchError">Ooooops, something went wrong.</p>
        <p v-if="searchResults == '404'">No results for query.</p>
        <template v-else>
          <li v-for="(sR, i) in searchResults" key="i" @click="previewCity(sR)">
            {{ sR.name.official }} - {{ sR.capital[0] }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const previewCity = (country) => {
  const capital = country.capital[0];
  router.push({
    name: "city",
    params: { city: capital },
    query: {
      lat: country.latlng[0],
      lng: country.latlng[1],
      preview: true,
    },
  });
};

const searchQuery = ref("");
const queryTimeout = ref(null);
let searchResults = ref(null);
let searchError = ref(true);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);

  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value) {
      searchResults.value = [];
      searchError.value = false;
      try {
        const result = await axios.get(
          `https://restcountries.com/v3.1/name/${searchQuery.value}`
        );
        searchResults.value = result.data;
        console.log(searchResults.value);
      } catch (e) {
        searchResults.value = e.response.data.status;
        searchResults.value == "404"
          ? (searchError.value = false)
          : (searchError.value = true);
      }

      return;
    }
    searchResults.value = null;
  }, 1300);
};
</script>
