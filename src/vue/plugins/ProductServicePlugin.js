import ProductService from "../utils/ProductService.js";

const ProductServicePlugin = {
  install: (Vue) => {
    Vue.prototype.$productService = ProductService;
  },
};

export default ProductServicePlugin;
