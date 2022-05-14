<template>
  <v-container>
    <BackButton class="ml-4 pb-0" />
    <v-container class="text-center pa-0">
      <h1 class="display-1 ma-3">{{ room.name }}</h1>
      <p class="subheading font-weight-regular">
        {{ room.meta.deviceCount }} devices<v-icon>mdi-circle-small</v-icon
        >{{ room.meta.activeDeviceCount }} active
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
// import rooms from "@/store/modules/rooms"
import { mapState, mapGetters } from "vuex"
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
    return {};
  },

  computed: {
    ...mapState("rooms", {
      rooms: (state) => state.rooms
    }),
    ...mapGetters("rooms", {
      getRoomByName: "getRoomByName",
    }),
    room() {
      return this.getRoomByName(this.slug)
    },
  },
  created() {
    // TODO get device types
    // return store.state.deviceTypes;
  }
};
</script>