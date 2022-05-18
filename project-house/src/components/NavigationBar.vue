<template>
  <nav>
    <v-app-bar app color="primary" dark>
      <!-- Title -->
      <router-link :to="{name: 'Home'}">
        <v-toolbar-title class="text-uppercase white--text">
          <span>project</span>
          <span class="font-weight-light"> House</span>
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <!-- Notifications -->
      <!-- <v-btn disabled icon> -->
        <!-- <v-icon>mdi-bell-outline</v-icon> -->
        <!-- <v-icon class="mr-4" >mdi-bell-ring</v-icon> --> 
      <!-- </v-btn> -->
      
      <!-- Language -->
      <v-menu open-on-hover v-model="language" bottom left offset-y transition="slide-y-transition">

        <!-- Activador del menu language-->
        <template v-slot:activator="{ on, attrs }">
          <v-btn small id="languageMenuButton" elevation="0" v-bind="attrs" v-on="on">
            <v-icon>mdi-translate</v-icon>
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>

        <!-- Opciones del menu language -->
        <v-list>
          <v-subheader>Language</v-subheader>
          <v-list-item>English</v-list-item>
          <!-- <v-list-item disabled>Spanish</v-list-item> -->
        </v-list>
      </v-menu>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  name: "NavigationBar",

  data() {
    return {
      tabs: true,
      language: false,
    };
  },
};
</script>

<style scoped>
#languageMenuButton {
  background-color: transparent;
}
</style>