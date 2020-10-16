import axios from "axios";

class Cart {
  constructor() {}

  /**
   * Use this to add one or multiple variants to the cart.
   * POST /cart/add.js
   * @returns {Promise<Response>} axios response
   */
  addItem(variantId, quantity = 1, props = {}) {
    return axios.post("/cart/add.js", {
      items: [
        {
          quantity: quantity,
          id: variantId,
          properties: props
        }
      ]
    });
  }

  /**
   * Use this to add multiple variants to the cart.
   * POST /cart/add.js
   * @returns {Promise<Response>} axios response
   */
  addBulk(items) {
    let cartItems = [];
    for (const item of items) {
      cartItems.push({
        quantity: item.quantity || 1,
        id: item.variantId,
        properties: item.props || {}
      });
    }
    return axios.post("/cart/add.js", {
      items: cartItems
    });
  }

  /**
   * Use this to get the cart as JSON.
   * GET /cart.js
   * @returns {Promise<Response>} axios response
   */
  getState() {
    return axios.get("/cart?view=endpoint");
  }

  /**
   * Use this to update the cart's note, attributes, or line item quantities.
   * POST /cart/update.js
   */
  updateLine(line, q) {
    return this.change({
      quantity: q,
      line: line
    });
  }

  /**
   * This call sets the quantity of an item already in the cart.
   * POST /cart/change.js
   */
  change(data) {
    return axios.post("/cart/change.js", data);
  }

  /**
   * Sets quantity to zero ond runs change
   */
  removeItem(line) {
    return this.change({
      quantity: 0,
      line: line
    });
  }

  /**
   * This call sets all quantities of all line items in the cart to zero.
   * POST /cart/clear.js
   */
  clear() {
    return axios.post("/cart/clear.js");
  }
}

export default new Cart();
