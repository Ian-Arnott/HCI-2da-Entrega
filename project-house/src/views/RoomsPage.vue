<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto" md="3" v-for="room in rooms" :key="room.name">
        <v-card hover ripple :to="{ name: 'RoomDetails', params: { name: room.name } }"
                @mouseenter="cardHovered = room.name"
                @mouseleave="cardHovered = null">
          <v-img
            max-height="100px"
            :src="require(`@/assets/rooms/${room.img}`)"
            :alt="room.name"
          />

          <!-- Show only if this card is being hovered -->
          <v-card-actions>
            <v-btn v-show="cardHovered === room.name" absolute right @click.stop.prevent fab small>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-card-actions>

          <v-card-title>{{ room.name }}</v-card-title>
          <v-card-text align="left">{{ deviceCount(room) }} devices
            <v-icon>mdi-circle-small</v-icon>
            {{ activeDeviceCount(room) }} active
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/api/api.js";
import store from "@/plugins/store.js";

export default {
  name: "RoomsPage",

  components: {},

  data() {
    return {
      cardHovered: null,
    }
  },

  // usamos metodos o propiedades computadas para acceder a las variables del store
  computed: {
    rooms() {
      return store.state.rooms;
    },    
  },

  methods: {
    deviceCount(room) {
      return store.getters.getDevicesByRoom(room).length;
    },

    activeDeviceCount(room) {
      return store.getters.getActiveDevicesByRoom(room).length;
    },
  },

  // este metodo se llama cuando se crea el componente, lo usamos para cargar datos
  created() {
    // llamo a la api para pedirle datos y luego los cargo en el store
    api.getRooms((rooms) => {
      store.commit("setRooms", rooms);
    });

    api.getDevices((devices) => {
      store.commit("setDevices", devices);
    });
  },
};
</script>

<style scoped>
#list {
  background-color: transparent;
}
</style>