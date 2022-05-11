<template>
  <v-app>
    <NavigationBar />

    <v-main>
      <!-- <v-container fluid> -->
      <router-view :key="$route.path" />
      <!-- </v-container> -->
    </v-main>

    <!-- FAB -->
    <AddButton v-if="this.$route.name != 'NotFound'" />
  </v-app>
</template>

<script>
import AddButton from "@/components/AddButton.vue";

import NavigationBar from "@/components/NavigationBar";

export default {
  name: "App",

  components: {
    AddButton,
    NavigationBar,
  },
};
</script>
