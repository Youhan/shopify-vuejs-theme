import Cart from "../utils/Cart.js";

const CartPlugin = {
  install: (Vue) => {
    Vue.prototype.$cart = Cart;
  },
};

export default CartPlugin;
