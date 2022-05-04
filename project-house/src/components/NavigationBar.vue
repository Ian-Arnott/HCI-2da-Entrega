<template>
  <nav>
    <v-app-bar app color="primary" dark>
      <!-- Title -->
      <router-link to="/">
        <v-toolbar-title class="mx-4 text-uppercase white--text">
          <span>project</span>
          <span class="font-weight-light"> House</span>
        </v-toolbar-title>
      </router-link>

      <!-- Tabs -->
      <template>
        <v-tabs centered v-show="tabs" align-with-title>
          <v-tab :to="{ name: 'Home' }">Home</v-tab>
          <v-tab :to="{ name: 'Rooms' }">Rooms</v-tab>
          <v-tab disabled>Routines</v-tab>
        </v-tabs>
      </template>

      <!-- Menu -->
      <v-menu v-model="menu" bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">

            <!-- Placeholder Dialog -->
            <v-dialog v-model="item.opened" max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-list-item-title v-bind="attrs" v-on="on">{{ item.title }} </v-list-item-title>
              </template>
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
            <!-- Placeholder Dialog -->

          </v-list-item>
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

      // menu items
      items: [
        { title: "Add room", opened: false },
        { title: "Add device", opened: false },
        { title: "Add routine", opened: false },
      ],
    };
  },
};
</script>

