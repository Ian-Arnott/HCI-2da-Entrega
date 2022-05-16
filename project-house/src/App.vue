<template>
  <v-app>
    <NavigationBar />

    <v-main>
      <v-container v-if="!connected" fill-height class="text-center">
        <v-col>
          <v-icon size="200px">mdi-wifi-strength-off-outline</v-icon>
          <!-- mdi-connection -->
          <!-- mdi-wifi-strength-off-outline -->
          <!-- mdi-lan-disconnect -->
          <h1 class="display-1 mb-2">Whoops, you are offline</h1>
          <p>Check your internet connection and try again</p>
        </v-col>
      </v-container>
      <router-view v-else :key="$route.path" />
    </v-main>

    <!-- Notifications -->
    <SnackBar/>

    <!-- FAB -->
    <AddButton v-if="showAddButton"/>
  </v-app>
</template>

<script>
import SnackBar from '@/components/SnackBar.vue';
import AddButton from "@/components/AddButton.vue";
import NavigationBar from "@/components/NavigationBar";

import { mapActions } from "vuex";

export default {
  name: "App",

  components: {
    SnackBar,
    AddButton,
    NavigationBar,
  },
  computed: {
    connected() {
      return this.$store.getters["connected"];
    },
    showAddButton() {
       return this.connected && this.$route.name != 'NotFound'
    }
  },
  methods: {
    ...mapActions("rooms", {
      getRooms: "getAll",
    }),
    ...mapActions("devices", {
      getDevices: "getAll",
    }),
    ...mapActions("deviceTypes", {
      getDeviceTypes: "getAll",
    }),
  },

  async created() {
    try {
      // await this.getRooms(); // lo hago en rooms page
      await this.getDevices();
      await this.getDeviceTypes();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
