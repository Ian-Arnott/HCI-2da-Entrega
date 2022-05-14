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
import store from "@/store/store.js";

import { mapActions } from "vuex";

export default {
  name: "App",

  components: {
    AddButton,
    NavigationBar,
  },

  methods: {
    ...mapActions("rooms", {
      $getAllRooms: "getAll",
    }),
    async getAllRooms() {
      try {
        await this.$getAllRooms();
      } catch (e) {
        console.log(e)
      }
    }
  },
  
  // este metodo se llama cuando se crea el componente, lo usamos para cargar datos
  async created() {
    await this.getAllRooms();
    
    api.getDevices((devices) => {
      store.commit("setDevices", devices);
    });
    api.getDeviceTypes((types) => {
      store.commit("setDeviceTypes", types);
    });
  },
};
</script>
