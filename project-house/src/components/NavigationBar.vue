<template>
  <nav>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase white--text">
        <span>project</span>
        <span class="font-weight-light"> House</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app class="blue-grey">
      <p>test</p>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "NavigationBar",

  data() {
    return {
      drawer: false,
    };
  },
};
</script>

