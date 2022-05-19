<template>
  <v-container fill-height class="text-center">
    <v-col>
      <v-icon size="200px">mdi-connection</v-icon>
      <h1 class="display-1 mb-2">Whoops, 404</h1>
      <p>The page you were looking for does not exist</p>
      <v-btn color="primary" :to="{ name: 'Home' }">GO BACK HOME</v-btn>
      <v-container>
        <LoadingAnimation v-show="loading"/>
      </v-container>
    </v-col>
  </v-container>
</template>

<script>
import LoadingAnimation from "@/components/LoadingAnimation.vue";
export default {
  title: "Not Found - Project House",
  components: { LoadingAnimation },
  computed: {
    loading() {
      return this.$store.getters["loading"];
    },
  },
};
</script>