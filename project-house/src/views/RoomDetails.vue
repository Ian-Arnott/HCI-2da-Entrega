<template>
  <v-container>
    <BackButton class="ml-4 pb-0" />
    <v-container class="text-center pa-0">
      <h1 class="display-1 ma-3">{{ room.name }}</h1>
      <p class="subheading font-weight-regular">
        {{ deviceCount }} devices<v-icon>mdi-circle-small</v-icon
        >{{ activeDeviceCount }} active
      </p>
    </v-container>

    <v-img v-if="loading" 
          contain height="50px" 
          :src="require('@/assets/ajax_loader.gif')" 
          alt="loading"/>
    <v-list v-else class="text-center">
      <!-- One DeviceList per category -->
      <DeviceList
        v-for="type in deviceTypes"
        :key="type.id"
        :deviceType="type"
        :room="room"
      />

      <!-- <p v-for="type in deviceTypes" :key="type.name">{{type}}</p> -->
    </v-list>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import DeviceList from "@/components/DeviceList";
import BackButton from "../components/BackButton.vue";

export default {
  name: "RoomDetails",

  components: {
    DeviceList,
    BackButton,
  },

  props: {
    slug: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loading: false
    };
  },

  computed: {
    ...mapState("rooms", {
      rooms: (state) => state.rooms,
    }),
    ...mapGetters("rooms", {
      getRoomByName: "getRoomByName",
    }),
    room() {
      return this.getRoomByName(this.slug);
    },
    deviceCount() {
      return this.room.meta.deviceCount;
    },
    activeDeviceCount() {
      return this.room.meta.activeDeviceCount;
    },

    ...mapState("deviceTypes", {
      deviceTypes: (state) => state.deviceTypes,
    }),
  },
  methods: {
    ...mapActions("devices", {
      getDevices: "getAll",
    }),
  },
  async created() {
    try {
      this.loading = true;
      // setTimeout(async () => {
      await this.getDevices();
      this.loading = false;
      // }, 1000)
    } catch (error) {
      console.error(error);
    }
  },
};
</script>