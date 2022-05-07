<template>
  <nav>
    <v-app-bar app color="primary" dark>
      <!-- Title -->
      <router-link to="/">
        <v-toolbar-title class="text-uppercase white--text">
          <span>project</span>
          <span class="font-weight-light"> House</span>
        </v-toolbar-title>
      </router-link>

      <!-- Tabs -->
      <template>
        <v-tabs centered v-show="tabs" align-with-title>
          <!-- <v-tab :to="{ name: 'Home' }">Home</v-tab>
          <v-tab :to="{ name: 'Rooms' }">Rooms</v-tab>
          <v-tab :to="{ name: 'Routines' }">Routines</v-tab> -->
        </v-tabs>
      </template>

      <!-- Add new item Menu -->
      <v-menu v-model="menu" bottom left offset-y transition="slide-y-transition">

        <!-- Activador del menu (boton +) -->
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>

        <v-list>
          <!-- Dialogs -->
          <v-dialog v-for="(item, i) in items" :key="i" persistent v-model="item.opened" max-width="600px">

            <!-- Activador del Dialog (item del menu) -->
            <template v-slot:activator="{ on, attrs }">
              <v-list-item v-bind="attrs" v-on="on" >
                <v-icon class="mr-4" >{{ item.icon }}</v-icon>
                <v-list-item-title>{{ item.title }} </v-list-item-title>
              </v-list-item>
            </template>

            <!-- Contenido del Dialog (placeholder) -->
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ item.title }}</span>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="item.opened = false; menu = false">
                  Close
                </v-btn>
                <v-btn color="blue darken-1" text @click="item.opened = false; menu = false">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list>
      </v-menu>

      <!-- Notifications -->
      <v-btn icon>
        <v-icon>mdi-bell-outline</v-icon>
        <!-- <v-icon class="mr-4" >mdi-bell-ring</v-icon> --> 
      </v-btn>
      
      <!-- Language -->
      <v-menu v-model="language" bottom left offset-y transition="slide-y-transition">

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
          <v-list-item>Spanish</v-list-item>
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
      menu: false,
      language: false,

      // menu items
      items: [
        { title: "Add room", opened: false, icon: "mdi-bed" },
        { title: "Add device", opened: false, icon: "mdi-lightbulb" },  // mdi-devices
        { title: "Add routine", opened: false, icon: "mdi-timeline-text" }, // mdi-text-box
      ],
    };
  },
};
</script>

<style scoped>
#languageMenuButton {
  background-color: transparent;
}
</style>