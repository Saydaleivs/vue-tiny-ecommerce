import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CartView from "../views/CartView.vue";
import ProductView from "../views/ProductView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/cart", name: "cart", component: CartView },
  { path: "/product/:id", name: "product", component: ProductView },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
