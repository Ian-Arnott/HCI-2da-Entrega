<template>
  <v-container>
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <v-container v-else-if="error" fill-height>
      <v-col>
        <h1 class="display-1 my-2">Oops, something went wrong</h1>
        <p>{{ error }}</p>
      </v-col>
    </v-container>

    <v-row v-else justify="center">
      <v-container v-show="rooms.length == 0" fill-height>
        <v-col>
          <h1 class="display-1 my-2">Oops, this is empty</h1>
          <p>Click the button on the bottom right to add a room</p>
        </v-col>
      </v-container>

      <v-col cols="auto" md="3" v-for="room in rooms" :key="room.name">
        <RoomCard :room="room" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import RoomCard from "@/components/RoomCard.vue";

export default {
  name: "RoomsPage",

  components: { RoomCard },

  data() {
    return {
      loading: false,
      error: null,
    };
  },

  computed: {
    ...mapState("rooms", {
      rooms: (state) => state.rooms,
    }),
  },
  methods: {
    ...mapActions("rooms", {
      getRooms: "getAll",
    }),
  },
  async created() {
    try {
      this.loading = true;
      // setTimeout(async () => {
      await this.getRooms();

      this.error = null;
      // }, 1000)
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case 100:
        case 101:
          this.error =
            "Unable to establish connection with the server, pleasetry again later";
          break;
        default:
          this.error = "Connection to server failed, please try again later";
          break;
      }
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
#list {
  background-color: transparent;
}
</style>