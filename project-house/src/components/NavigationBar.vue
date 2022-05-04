<template>
  <nav>
    <v-app-bar app color="primary" dark>
      <!-- <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon> -->

      <router-link to="/">
        <v-toolbar-title class="mx-4 text-uppercase white--text">
          <span>project</span>
          <span class="font-weight-light"> House</span>
        </v-toolbar-title>
      </router-link>

      <!-- tabs -->
      <template>
        <v-tabs centered v-show="tabs" align-with-title>
          <v-tab :to="{ name: 'Home' }">Home</v-tab>
          <v-tab :to="{ name: 'Rooms' }">Rooms</v-tab>
          <v-tab disabled>Routines</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <!-- <v-navigation-drawer v-model="drawer" app class="blue-grey">
      <p>test</p>
    </v-navigation-drawer> -->
  </nav>
</template>

<script>
export default {
  name: "NavigationBar",

  data() {
    return {
      drawer: false,
      tabs: true,
    };
  },
};
</script>

