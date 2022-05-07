<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto" md="3" v-for="room in rooms" :key="room.name">
        <v-card ripple :to="{ name: 'RoomDetails', params: { id: room.name } }">
          <v-img
            max-height="100px"
            :src="require(`@/assets/rooms/${room.img}`)"
            :alt="room.name"
          />

          <v-card-actions>
            <v-btn absolute right @click.stop.prevent fab small>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-card-actions>

          <v-card-title>{{ room.name }}</v-card-title>
          <v-card-text align="left">14 devices 1 active</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "RoomsPage",

  components: {},

  data() {
    return {
      rooms: [
        {
          name: "Misc",
          devices: [
            { name: "Device 1" },
            { name: "Device 2" },
            { name: "Device 3" },
          ],
          img: "kitchen.jpeg",
        },
        {
          name: "Kitchen",
          devices: [
            { name: "Device 1" },
            { name: "Device 2" },
            { name: "Device 3" },
          ],
          img: "kitchen.jpeg",
        },
        {
          name: "Bedroom",
          devices: [
            { name: "Device 1" },
            { name: "Device 2" },
            { name: "Device 3" },
          ],
          img: "bedroom.jpeg",
        },
        {
          name: "Living Room",
          devices: [
            { name: "Device 1" },
            { name: "Device 2" },
            { name: "Device 3" },
          ],
          img: "living-room.jpg",
        },
      ],
    };
  },
};
</script>

<style scoped>
#list {
  background-color: transparent;
}
</style>