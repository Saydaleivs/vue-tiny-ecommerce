<script setup>
import Cart from "@/components/Cart.vue";
</script>

<template>
  <div v-if="$store.state.cartProducts.length > 0">
    <Cart
      v-for="product in $store.state.cartProducts"
      :product="product"
      :isCart="true"
      :loading="false"
    />
  </div>
  <p v-else>No items selected</p>
</template>
