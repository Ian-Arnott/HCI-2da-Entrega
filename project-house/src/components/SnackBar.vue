<template>
  <v-snackbar v-model="snackbar.show" :timeout="2000">{{
    snackbar.text
  }}</v-snackbar>
</template>

<script>
export default {
  computed: {
    snackbar() {
      return this.$store.getters["snackbar"];
    },
  },
};
</script>