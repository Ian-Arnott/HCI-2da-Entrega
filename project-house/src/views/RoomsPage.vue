<template>
  <v-container>
    <v-img v-if="loading" 
          contain height="50px" 
          :src="require('@/assets/ajax_loader.gif')" 
          alt="loading"/>
    <v-row v-else justify="center">
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
            <v-btn v-show="cardHovered === room.name && room.meta.editable" absolute right @click.stop.prevent fab small>
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
import { mapActions, mapState } from "vuex";

export default {
  name: "RoomsPage",

  components: {},

  data() {
    return {
      cardHovered: null,
      loading: false
    }
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
      this.loading = true
      // setTimeout(async () => {
        await this.getRooms()
        this.loading = false
      // }, 1000)
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