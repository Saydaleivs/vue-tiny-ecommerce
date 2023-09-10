import { createStore } from "vuex";

export default createStore({
  state: { cartProducts: { count: 0, products: [] }, products: [] },
  mutations: {
    addToCart(state, { product }) {
      state.cartProducts.count += 1;
      state.cartProducts.products.push(product);
    },
    setCart(state, { index }) {
      // let count = state.cartProducts.count;
      state.cartProducts.count =
        state.cartProducts.count -
        (state.cartProducts.products[index].amount || 1);
      state.cartProducts.products.splice(index, 1);
      // state.cartProducts.products = products;
    },
    setProducts(state, { products }) {
      state.products = products;
    },
    addAmount(state, { index }) {
      let prod = state.cartProducts.products[index];
      state.cartProducts.count += 1;

      if ("amount" in prod) {
        prod.amount += 1;
        return;
      }

      prod.amount = 2;
    },
  },
  actions: {
    addToCart(context, { id }) {
      const cartProdIndex = context.state.cartProducts.products.findIndex(
        (p) => p.id === id
      );
      if (cartProdIndex !== -1) {
        context.commit("addAmount", { index: cartProdIndex });
        return;
      }

      const product = context.state.products.find((p) => p.id === id);
      context.commit("addToCart", { product });
    },
    removeFromCart(context, { id }) {
      const deletedProdIndex = context.state.cartProducts.products.findIndex(
        (p) => p.id === id
      );
      context.commit("setCart", { index: deletedProdIndex });
    },
    saveProducts(context, { products }) {
      context.commit("setProducts", { products });
    },
  },
  modules: {},
});
