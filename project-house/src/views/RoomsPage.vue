<template>
  <v-container class="text-center">
    <!-- <h1 class="ma-4">Rooms Tab</h1> -->
    <v-row justify="center" v-for="room in rooms" :key="room.name">
      <v-container fluid>
        <v-card
          ripple
          :to="{ name: 'RoomDetails', params: { id: room.name } }"
          :img="require(`@/assets/rooms/${room.img}`)"
        >
          <v-card-title>{{ room.name }}</v-card-title>
          <v-card-subtitle align="left">Room description</v-card-subtitle>

          <!-- Device placeholder, cuando hacemos click luego hay que mostrar un pop up -->
          <v-list id="list">
            <v-list-item
              v-for="device in room.devices"
              :key="device.name"
              :to="`/devices/${device.name}`" 
              >{{ device.name }}</v-list-item
            >
          </v-list>
          <!-- Device placeholder -->

        </v-card>
      </v-container>
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