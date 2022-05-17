<template>
  <!-- Show only if this card is being hovered -->
  <v-card
    hover
    ripple
    :to="{ name: 'RoomDetails', params: { slug: room.name } }"
    @mouseenter="cardHovered = true"
    @mouseleave="cardHovered = false"
  >
    <v-img
      max-height="100px"
      :src="require(`@/assets/rooms/${room.meta.img}`)"
      :alt="room.name"
    />

    <v-card-actions>
      <v-dialog v-model="editMenu" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            v-show="cardHovered && room.meta.editable"
            absolute
            right
            @click.prevent
            fab
            small
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <!-- Dialog content -->
        <v-card class="text-center overflow-hidden" max-width="600px">
          <v-toolbar flat>
            <v-toolbar-title class="text-h5">Edit {{room.name}}</v-toolbar-title>
            <v-spacer></v-spacer>

            <!-- Delete Confirmation Dialog -->
            <v-dialog v-model="confirmMenu" max-width="300px">
              <template v-slot:activator="{ on, attrs}">
                <v-btn icon @click.stop v-bind="attrs" v-on="on">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>

              <v-card dark color="warning">
                <v-card-title>Delete Confirmation</v-card-title>
                <v-card-text>Are you sure you want to delete "{{room.name}}"?</v-card-text>
                <v-list nav dense dark color="warning">
                  <v-list-item-group v-model="deleteOption">
                    <v-list-item>Delete room and all it's devices</v-list-item>
                    <v-list-item>Delete room but keep devices</v-list-item>
                  </v-list-item-group>
                </v-list>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="confirmMenu = false">Cancel</v-btn>
                  <v-btn text :disabled="deleteOption == undefined" @click="deleteRoom">Delete</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </v-card>
      </v-dialog>
    </v-card-actions>

    <v-card-title>{{ room.name }}</v-card-title>
    <v-card-text align="left"
      >{{ room.meta.deviceCount }} devices
      <v-icon>mdi-circle-small</v-icon>
      {{ room.meta.activeDeviceCount }} active
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  props: {
    room: {
      required: true,
    },
  },
  data() {
    return {
      cardHovered: false,
      editMenu: false,
      confirmMenu: false,
      deleteOption: undefined,
    };
  },
  computed: {
    ...mapGetters("devices", {
      getDevicesFromRoom: "getDevicesByRoom"
    }),
    devices() {
      return this.getDevicesFromRoom(this.room)
    }
  },
  methods: {
    ...mapActions("rooms", {
      $deleteRoom: "delete",
    }),
    ...mapActions("devices", {
      deleteDevice: "delete"
    }),
    async deleteRoom() {
      let snackbar = {show: true, text: ""}
      console.log(this.deleteOption)
      if (this.deleteOption == 0) {
        // remove devices
        console.log('devices:', this.devices)
        try {
          for (let i = 0; i < this.devices.length; i++) {
            const result = await this.deleteDevice(this.devices[i].id)
            console.log(result)
          }
        } catch (error) {
          console.error(error)
          snackbar.text = "There was an error deleting this room's devices"
        }
      }

      // remove room
      try {
        const result = await this.$deleteRoom(this.room.id)
        console.log(result)
        snackbar.text = "Room deleted succesfully"
      } catch (error) {
        console.error(error)
        snackbar.text = "There was an error deleting the room"
      }

      this.$store.dispatch("setSnackbar", snackbar)
    }
  }
};
</script>