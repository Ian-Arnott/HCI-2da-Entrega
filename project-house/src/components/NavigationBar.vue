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
      
      <!-- Help -->
      <v-menu max-width="200" open-on-hover v-model="language" bottom left offset-y transition="slide-y-transition">

        <template v-slot:activator="{ on, attrs }">
          <v-btn small id="languageMenuButton" elevation="0" v-bind="attrs" v-on="on">
            <v-icon>mdi-help-circle</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>Press the '+' button to add a device, room, or routine</v-list-item>
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