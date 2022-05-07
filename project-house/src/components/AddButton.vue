<template>
  <!-- Add new item Menu -->
  <v-menu v-model="menu" top left offset-x offset-y transition="slide-x-transition">

    <!-- Activador del menu (boton +) -->
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab dark color="primary" fixed bottom right class="ma-4" v-bind="attrs" v-on="on">
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
</template>

<script>
export default {
  name: "AddButton",

  data() {
    return {
      menu: false,
      
      // menu items
      items: [
        { title: "Add room", opened: false, icon: "mdi-bed" },
        { title: "Add device", opened: false, icon: "mdi-lightbulb" },  // mdi-devices
        { title: "Add routine", opened: false, icon: "mdi-timeline-text" }, // mdi-text-box
      ],
    }
  }
}
</script>

