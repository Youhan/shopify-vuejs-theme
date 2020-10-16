<template>
  <div class="flex flex-col items-center justify-center">
    <h2 class="font-heading text-lg mb-4">Example Add to cart Button</h2>
    <button class="bg-brand-500 text-white px-4 py-2 rounded hover:bg-brand-700 transition duration-200" v-on:click="addOne">Click to simulate Add to cart</button>
    <p class="mt-4">You have {{ count }} times in your cart.</p>
    <p class="mt-4">You can also reload this page or navigate to other pages</p>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState("cart", ["count"])
  },
  methods: {
    ...mapMutations("cart", ["addOne"])
  }
};
</script>
