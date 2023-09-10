<script setup>
import axios from "axios";
import Cart from "../components/Cart.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCartVariant } from "@mdi/js";
import { RouterLink } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";
import { ref } from "vue";

const store = useStore();
const path = mdiCartVariant;
let products = ref(store.state.products);
let loading = true;
let page = 1;
let limit = 10;
let pageLen = 5;
let category = "";
let categories = ref(["all"]);

onMounted(async () => {
  const skip = (page - 1) * limit;
  await fetchProducts(limit, skip, category);
  await fetchCategories();
});

async function fetchProducts(limit, skip, category) {
  loading = true;
  const { data } = await axios.get(
    `https://dummyjson.com/products/${
      !category || category === "all" ? "" : "category/" + category
    }?limit=${limit}&skip=${skip}`
  );
  // products.value = data.products;
  store.dispatch("saveProducts", { products: data.products });
  pageLen = data.total / limit;
  loading = false;
}

async function fetchCategories() {
  const { data } = await axios.get(`https://dummyjson.com/products/categories`);
  categories.value = [...categories.value, ...data];
}

async function handlePageChange(page) {
  const skip = skipValue(page, limit);
  await fetchProducts(limit, skip, category);
}

function handleCategoryChange(category) {
  const skip = skipValue(page, limit);

  category = category;
  fetchProducts(limit, skip, category);
}

function skipValue(page, limit) {
  return (page - 1) * limit;
}
</script>

<template>
  <v-app>
    <v-col cols="auto">
      <v-pagination
        v-if="pageLen > 1"
        rounded
        :length="pageLen"
        @update:model-value="handlePageChange"
      ></v-pagination>

      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '370px',
          margin: 'auto',
        }"
      >
        <v-select
          label="Select"
          :style="{ marginTop: '22px', marginRight: '20px' }"
          :items="categories"
          @update:model-value="handleCategoryChange"
        ></v-select>

        <v-badge :content="$store.state.cartProducts.count">
          <RouterLink to="/cart">
            <div :style="{ cursor: 'pointer' }">
              <svg-icon type="mdi" :path="path"></svg-icon>
            </div>
          </RouterLink>
        </v-badge>
      </div>

      <div v-if="!loading">
        <Cart
          v-for="product in $store.state.products"
          :product="product"
          :loading="loading"
        />
      </div>
      <div
        v-else
        :style="{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        }"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </v-col>
  </v-app>
</template>
