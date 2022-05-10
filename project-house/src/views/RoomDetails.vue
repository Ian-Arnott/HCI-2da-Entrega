<template>
  <v-container>
    <BackButton class="ml-4 pb-0"/>
    <v-container class="text-center pa-0">
      <h1 class="display-1 ma-3">{{ name }}</h1>
      <p class="subheading font-weight-regular">
        {{ deviceCount }} devices<v-icon>mdi-circle-small</v-icon
        >{{ activeDeviceCount }} active
      </p>
    </v-container>

    <v-list class="text-center">
      <!-- One DeviceList per category -->
      <DeviceList
        v-for="type in deviceTypes"
        :key="type.name"
        :deviceType="type"
        :room="room"
      />
    </v-list>
  </v-container>
</template>

<script>
import api from "@/api/api.js";
import store from "@/plugins/store";
import DeviceList from "@/components/DeviceList";
import BackButton from "../components/BackButton.vue";

export default {
  name: "RoomDetails",

  components: {
    DeviceList,
    BackButton,
  },

  props: {
    name: {
      type: String,
      required: true,
    },
    room: {
      required: true,
    },
  },

  data() {
    return {};
  },

  computed: {
    devices() {
      return store.getters.getDevicesByRoom(this.room);
    },

    deviceTypes() {
      return store.state.deviceTypes;
    },

    deviceCount() {
      return store.getters.getDevicesByRoom(this.room).length;
    },

    activeDeviceCount() {
      return store.getters.getActiveDevicesByRoom(this.room).length;
    },
  },

  created() {
    api.getDevices((devices) => {
      store.commit("setDevices", devices);
    });

    api.getDeviceTypes((types) => {
      store.commit("setDeviceTypes", types);
    });
  },
};
</script>