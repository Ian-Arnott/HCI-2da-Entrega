<template>
  <v-app>
    <NavigationBar />

    <v-main>
      <!-- <v-container fluid> -->
        <router-view :key="$route.path"/>
      <!-- </v-container> -->
    </v-main>
  </v-app>
</template>

<script>
import NavigationBar from "@/components/NavigationBar";

export default {
  name: "App",

  components: {
    NavigationBar,
  },
};
</script>
