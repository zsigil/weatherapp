<template>
  <div></div>
</template>

<script setup>
import axios from "axios";
import { useRouter } from "vue-router";

const route = useRouter();
let country = "Mexico";

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
console.log(apiData);
</script>
