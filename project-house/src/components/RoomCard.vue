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
      <v-dialog v-model="editMenu" max-width="600px" @click:outside="closeDialog()">
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

          <!-- Edit fields -->
          <v-card-text class="mt-2">
            <v-form v-model="valid" @submit.prevent>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="newRoomName"
                    :rules="nameRules"
                    :counter="maxChars"
                    :placeholder="room.name"
                    persistent-placeholder
                    color="secondary"
                    label="Room name"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-autocomplete
                    v-model="newRoomType"
                    :items="types"
                    item-text="name"
                    :placeholder="room.meta.type"
                    persistent-placeholder
                    color="secondary"
                    label="Room type"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-form>
          <LoadingAnimation v-show="loading"/>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions >
            <v-spacer></v-spacer>
            <v-btn text @click="closeDialog()">Close</v-btn>
            <v-btn :disabled="!canSave() || !valid" color="primary" @click="editRoom()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>

    <v-card-title>{{ room.name }}</v-card-title>
    <v-card-text align="left"
      >{{ devices.length + `${devices.length == 1 ? ' device': ' devices'}` }}
      <v-icon>mdi-circle-small</v-icon>
      {{ activeDevices }} active
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import LoadingAnimation from "@/components/LoadingAnimation"

export default {
  components: {
    LoadingAnimation
  },
  props: {
    room: {
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      cardHovered: false,
      editMenu: false,
      confirmMenu: false,
      deleteOption: undefined,

      //  edit form data
      valid: false,
      newRoomName: "",
      minChars: 3,
      maxChars: 20,
      nameRules: [
        (v) => /^$|^[\w ]+$/.test(v) || "Invalid character",
        (v) => (v.length == 0 || (v.length >= this.minChars && v.length <= this.maxChars)) ||
          `Room name must be between ${this.minChars}-${this.maxChars} characters`,
        (v) => !/^[\s]+$/.test(v) || "Invalid room name",
        (v) => !/^All Devices$/.test(v) || "Invalid room name",
      ],
      newRoomType: "",
      types: this.$store.getters["rooms/getRoomTypes"],
    };
  },
  computed: {
    ...mapGetters("devices", {
      getDevicesFromRoom: "getDevicesByRoom",
    }),
    ...mapGetters("rooms", {
      getActiveDevices: "getActiveDevices"
    }),
    devices() {
      return this.getDevicesFromRoom(this.room)
    },
    activeDevices() {
      return this.getActiveDevices(this.devices)
    }
  },
  methods: {
    ...mapActions("rooms", {
      $deleteRoom: "delete",
      $editRoom: "edit",
    }),
    ...mapActions("devices", {
      deleteDevice: "delete"
    }),
    canSave() {
      return this.newRoomName != "" || (this.newRoomType && this.newRoomType != "");
    },
    closeDialog() {
      this.editMenu = false
      this.newRoomName = ""
      this.newRoomType = ""
    },
    async editRoom() {
      const name = this.newRoomName != "" ? this.newRoomName : this.room.name
      const type = (this.newRoomType && this.newRoomType != "") ? this.newRoomType : this.room.meta.type
      const img = this.types.find((t) => t.name == type).img;

      let snackbar = { show: true, text: "" }

      this.loading = true
      try {
        await this.$editRoom({ 
          id: this.room.id, 
          name: name, 
          meta: {
            img: img,
            type: type,
          } 
        })
        this.closeDialog()
        snackbar.text = "Room updated successfully";
      } catch (error) {
        switch (error.code) {
          case 2:
            snackbar.text = "Room already exists";
            break;
          default:
            snackbar.text = "Unexpecter error";
            console.error(error)
        }
      } finally {
        this.$store.dispatch('setSnackbar', snackbar)
        this.loading = false
      }
    },
    async deleteRoom() {
      // this.loading = true
      let snackbar = {show: true, text: ""}
      if (this.deleteOption == 0) {
        // remove devices
        try {
          for (let i = 0; i < this.devices.length; i++) {
            await this.deleteDevice(this.devices[i].id)
          }          
        } catch (error) {
          console.error(error)
          snackbar.text = "There was an error deleting this room's devices"
        }
      }

      // remove room
      try {
        await this.$deleteRoom(this.room.id)
        snackbar.text = "Room deleted successfully"
      } catch (error) {
        console.error(error)
        snackbar.text = "There was an error deleting the room"
      }

      // this.loading = false
      this.$store.dispatch("setSnackbar", snackbar)
    }
  }
};
</script>