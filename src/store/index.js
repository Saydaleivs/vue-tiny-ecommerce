import { createStore } from "vuex";

export default createStore({
  state: { cartProducts: [], products: [] },
  mutations: {
    addToCart(state, { product }) {
      state.cartProducts.push(product);
    },
    setCart(state, { products }) {
      state.cartProducts = products;
    },
    setProducts(state, { products }) {
      state.products = products;
    },
  },
  actions: {
    addToCart(context, { id }) {
      const product = context.state.products.find((p) => p.id === id);
      context.commit("addToCart", { product });
    },
    removeFromCart(context, { id }) {
      const products = context.state.cartProducts.filter((p) => p.id !== id);
      context.commit("setCart", { products });
    },
    saveProducts(context, { products }) {
      context.commit("setProducts", { products });
    },
  },
  modules: {},
});
