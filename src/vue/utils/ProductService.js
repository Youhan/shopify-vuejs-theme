import axios from "axios";

class ProductService {
  constructor() {
    this.collectionsEndpoint = "products-endpoint";
    this.productEndpoint = "product-endpoint";
    this.productMiniEndpoint = "product-mini-endpoint";
  }

  /**
   * Fetch products of a collection with filtered tags
   *
   * @param {String}  handle collection handle
   * @param {Array} tags provided tags
   * @param {String} sortBy string
   * @param {Number} page
   * @returns {Array} array of products
   */
  async getAll({ handle, tags, page, sortBy }) {
    if (!handle) handle = "all";
    if (!page) page = 1;

    // call the endpoint by axios
    let items = [];
    let info = {};
    try {
      tags = encodeURI(tags.join("+"));
      let { data } = await axios.get(`/collections/${handle}/${tags}?page=${page}&sort_by=${sortBy}&view=${this.collectionsEndpoint}`);

      // this is required for shopify customizer to work
      if (typeof data === "string") {
        data = data.replace("<!-- BEGIN template --><!-- collection.products-endpoint -->{", "{");
        data = data.replace("<!-- END template -->", "");
        data = JSON.parse(data);
      }

      items = data.products;
      info.productsCount = data.products_count;
    } catch (err) {
      console.error(err);
      return [];
    }

    return {
      items,
      info
    };
  }

  /**
   * Fetch the product from a custom liquid endpoint and
   * transform it
   *
   * @param {String} handle Shopify product handle
   */
  async getOne(handle) {
    // call the endpoint by axios
    let product = {};
    try {
      let { data } = await axios.get(`/products/${handle}?view=${this.productEndpoint}`);

      // this is required for shopify customizer to work
      if (typeof data === "string") {
        data = data.replace("<!-- BEGIN template --><!-- product.product-endpoint -->{", "{");
        data = data.replace("<!-- END template -->", "");
        data = JSON.parse(data);
      }

      product = data.product;
    } catch (err) {
      console.error(err);
      return [];
    }

    return product;
  }
  /**
   * Fetch the product from a custom liquid endpoint and
   * transform it
   *
   * @param {String} handle Shopify product handle
   */
  async getOneMini(handle) {
    // call the endpoint by axios
    let product = {};
    try {
      let { data } = await axios.get(`/products/${handle}?view=${this.productMiniEndpoint}`);

      // this is required for shopify customizer to work
      if (typeof data === "string") {
        data = data.replace("<!-- BEGIN template --><!-- product.product-mini-endpoint -->{", "{");
        data = data.replace("<!-- END template -->", "");
        data = JSON.parse(data);
      }

      product = data.product;
    } catch (err) {
      console.error(err);
      return [];
    }
    // transform the results
    return product;
  }
}

export default new ProductService();
