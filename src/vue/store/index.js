import VuexPersist from "vuex-persist";
import cart from "./cart";

const vuexLocal = new VuexPersist({
  key: "_theme_local",
  storage: window.localStorage,
  reducer: state => {
    return {};
  },
  filter: mutation => {
    return true;
  }
});

export default {
  modules: {
    cart
  },
  plugins: [vuexLocal.plugin]
};
