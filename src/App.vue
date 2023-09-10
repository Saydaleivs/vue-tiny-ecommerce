<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div>
    <RouterLink :style="{ margin: '20px' }" to="/">Home</RouterLink>
    <RouterView />
  </div>
</template>
<style></style>
