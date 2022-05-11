<template>
  <v-app>
    <NavigationBar />

    <v-main>
      <router-view :key="$route.path" />
    </v-main>

    <!-- FAB -->
    <AddButton v-if="this.$route.name != 'NotFound'" />
  </v-app>
</template>

<script>
import AddButton from "@/components/AddButton.vue";

import NavigationBar from "@/components/NavigationBar";

import api from "@/api/api.js";
import store from "@/plugins/store.js";

export default {
  name: "App",

  components: {
    AddButton,
    NavigationBar,
  },

  // este metodo se llama cuando se crea el componente, lo usamos para cargar datos
  created() {
    api.getRooms((rooms) => {
      store.commit("setRooms", rooms);
    });

    api.getDevices((devices) => {
      store.commit("setDevices", devices);
    });

    api.getDeviceTypes((types) => {
      store.commit("setDeviceTypes", types);
    });
  },
};
</script>
