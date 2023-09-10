<script setup>
import axios from "axios";
import Cart from "../components/Cart.vue";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();

const product = ref();
const loading = ref(true);

async function fetchProduct(id) {
  const { data } = await axios.get("https://dummyjson.com/products/" + id);
  loading.value = false;
  product.value = data;
}

onMounted(async () => {
  await fetchProduct(route.params.id);
});
</script>

<template>
  <div>
    <Cart v-if="product" :product="product" :loading="loading" />
  </div>
</template>

<style></style>
