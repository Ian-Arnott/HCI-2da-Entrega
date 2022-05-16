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
        <RoomCard :room="room"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import RoomCard from '@/components/RoomCard.vue';

export default {
  name: "RoomsPage",

  components: {RoomCard},

  data() {
    return {
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