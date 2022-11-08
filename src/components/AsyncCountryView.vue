<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div
      v-if="route.query.preview"
      class="p-4 text-white bg-weather-secondary w-full text-center"
    >
      <p>
        You are currently previewing this country, press the + icon to start
        tracking it.
      </p>
    </div>

    <!-- Overview -->
    <div class="flex flex-col py-12 items-center text-white">
      <h1 class="text-4xl mb-2">{{ apiData.All.country }}</h1>

      <p>
        Confirmed cases:
        {{ new Intl.NumberFormat(locale).format(+apiData.All.confirmed) }}
      </p>
      <p>
        Deaths:
        {{ new Intl.NumberFormat(locale).format(+apiData.All.deaths) }}
      </p>

      <p>
        Life expectancy:
        {{ new Intl.NumberFormat(locale).format(+apiData.All.life_expectancy) }}
        years
      </p>

      <p>
        Dead (of confirmed cases):
        {{ ((+apiData.All.deaths / +apiData.All.confirmed) * 100).toFixed(2) }}%
      </p>

      <p>
        Dead (of population):
        {{
          ((+apiData.All.deaths / +apiData.All.population) * 100).toFixed(2)
        }}%
      </p>
    </div>

    <div
      @click="removeCountry"
      class="flex items-center py-12 text-white gap-2 cursor-pointer duration-150 hover:text-red-500"
    >
      <i class="fa-solid fa-trash text-xl"></i>
      Remove country
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const country = route.params.country;
const locale = navigator.language;

const getData = async () => {
  try {
    const result = await axios.get(
      `https://covid-api.mmediagroup.fr/v1/cases?country=${country}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const apiData = await getData();

const router = useRouter();
const removeCountry = () => {
  const countries = JSON.parse(localStorage.getItem("savedCountries"));
  const country = apiData["All"].country;

  const newCountries = countries.filter((c) => c.country !== country);

  localStorage.setItem("savedCountries", JSON.stringify(newCountries));
  router.push({ name: "home" });
};
</script>
