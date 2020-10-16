import VuexPersist from "vuex-persist";
import cart from "./cart";

const vuexLocal = new VuexPersist({
  key: "_theme_local",
  storage: window.localStorage
});

export default {
  modules: {
    cart
  },
  plugins: [vuexLocal.plugin]
};
