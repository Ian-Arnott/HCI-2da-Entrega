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
      <AddRoom icon="mdi-lightbulb" title="Add Device" @dialogClosed="menu = false"/>
      <AddRoom icon="mdi-bed" title="Add Room" @dialogClosed="menu = false"/>
      <AddRoom icon="mdi-timeline-text" title="Add Routine" @dialogClosed="menu = false"/>
    </v-list>
  </v-menu>
</template>

<script>
import AddRoom from './AddRoom.vue'

export default {
  components: { AddRoom },
  name: "AddButton",
}
</script>

