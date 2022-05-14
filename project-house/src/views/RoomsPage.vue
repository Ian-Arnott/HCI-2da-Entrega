<template>
  <v-container>
    <v-row justify="center">
      <v-container v-show="rooms.length == 0" fill-height>
        <v-col>
          <h1 class="display-1 my-2">Oops, this is empty</h1>
          <p>Click the button on the bottom right to add a room</p>
        </v-col>
      </v-container>

      <v-col cols="auto" md="3" v-for="room in rooms" :key="room.name">
        <v-card hover ripple :to="{ name: 'RoomDetails', params: { slug: room.name } }"
                @mouseenter="cardHovered = room.name"
                @mouseleave="cardHovered = null">
          <v-img
            max-height="100px"
            :src="require(`@/assets/rooms/${room.meta.img}`)"
            :alt="room.name"
          />

          <!-- Show only if this card is being hovered -->
          <v-card-actions>
            <v-btn v-show="cardHovered === room.name" absolute right @click.stop.prevent fab small>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-card-actions>

          <v-card-title>{{ room.name }}</v-card-title>
          <v-card-text align="left">{{ room.meta.deviceCount  }} devices
            <v-icon>mdi-circle-small</v-icon>
            {{ room.meta.activeDeviceCount  }} active
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "RoomsPage",

  components: {},

  data() {
    return {
      cardHovered: null,
    }
  },

  computed: {
    ...mapState("rooms", {
      rooms: (state) => state.rooms,
    }),
  },
  methods: {
    ...mapActions("rooms", {
      getDevices: "getDevices",
      getActiveDevices: "getActiveDevices"
    }),
  },
  async created() {
      try {
        await this.rooms.forEach(room => {
          this.getDevices(room.id)

          console.log('device count:', room.meta.deviceCount)
          console.log('active device count:', room.meta.activeDeviceCount)
        });
      } catch (error) {
        console.error(error) 
      }
  }
};
</script>

<style scoped>
#list {
  background-color: transparent;
}
</style>