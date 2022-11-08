<template>
  <div v-for="country in savedCountries" :key="country.id">
    <CountryCard :country="country" @click="goToCountryView(country)" />
  </div>

  <div v-if="savedCountries.length == 0">No locations added yet.</div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CountryCard from "./CountryCard.vue";
const savedCountries = ref([]);

const getCountries = async () => {
  if (localStorage.getItem("savedCountries")) {
    savedCountries.value = JSON.parse(localStorage.getItem("savedCountries"));

    const requests = [];
    savedCountries.value.forEach((country) => {
      requests.push(
        axios.get(
          `https://covid-api.mmediagroup.fr/v1/cases?country=${country.country}`
        )
      );
    });

    const countryData = await Promise.all(requests);

    countryData.forEach((country, index) => {
      savedCountries.value[index] = country.data;
    });
  }
};

await getCountries();

const router = useRouter();

const goToCountryView = (country) => {
  router.push({
    name: "country",
    params: {
      country: country["All"].country,
    },
  });
};
</script>
