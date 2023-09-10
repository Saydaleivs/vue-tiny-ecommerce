<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const isActive = false;
const emit = defineEmits();

const props = defineProps({
  product: {
    type: Object,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  isCart: {
    type: Boolean,
    default: false,
  },
});

function showSingleProd(id) {
  router.push(`/product/${id}`);
}

function addToCart(id) {
  store.dispatch("addToCart", { id });
}

function removeFromCart(id) {
  store.dispatch("removeFromCart", { id });
}
</script>

<template>
  <v-card
    v-if="product"
    :key="product.id"
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img cover height="250" :src="product.images[0]"></v-img>

    <v-card-item>
      <v-card-title
        >{{ product.title }}
        <span v-if="product.amount"
          >({{ product.amount + "x" }})</span
        ></v-card-title
      >
    </v-card-item>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :model-value="product.rating"
          color="amber"
          density="compact"
          half-increments
          readonly
          size="small"
        ></v-rating>

        <div class="text-grey ms-4">
          {{ product.rating }}
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1">
        {{ product.brand }}
      </div>

      <div>{{ product.description }}</div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-actions>
      <v-btn
        v-if="!isCart"
        color="deep-purple-lighten-2"
        variant="tonal"
        @click="addToCart(product.id)"
      >
        add to cart
      </v-btn>
      <v-btn
        @click="showSingleProd(product.id)"
        color="deep-purple-lighten-2"
        variant="tonal"
      >
        details
      </v-btn>
      <v-btn
        v-if="isCart"
        @click="removeFromCart(product.id)"
        color="deep-purple-lighten-2"
        variant="tonal"
      >
        remove
      </v-btn>
    </v-card-actions>
  </v-card>

  <!-- <v-progress-circular v-else indeterminate color="primary"></v-progress-circular> -->
</template>
