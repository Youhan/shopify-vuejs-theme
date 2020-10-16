<template>
  <div>({{ count }})</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("cart", ["count"])
  }
};
</script>
