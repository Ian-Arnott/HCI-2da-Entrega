<template>
  <v-dialog v-model="menu" max-width="600px" @click:outside="closeDialog()">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon absolute right @click.stop v-bind="attrs" v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <!-- Dialog content -->
    <v-card class="text-center overflow-hidden" max-width="600px">
      <v-toolbar flat>
        <!-- <v-icon>mdi-lightbulb</v-icon> -->
        <v-toolbar-title v-if="isEditing" class="text-h5">Edit {{ device.name }}{{ roomName }}</v-toolbar-title>
        <v-toolbar-title v-else class="text-h5">{{ device.name }}{{ roomName }}</v-toolbar-title>
        <v-spacer></v-spacer>
        
        <!-- Edit button -->
        <v-btn icon @click="isEditing = !isEditing">
          <v-icon v-if="isEditing">mdi-close</v-icon>
          <v-icon v-else>mdi-pencil</v-icon>
        </v-btn>

        <!-- Delete Dialog -->
        <v-dialog v-model="confirmMenu" max-width="300px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click.stop v-bind="attrs" v-on="on">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>

          <v-card dark color="warning">
            <v-card-title>Delete Confirmation</v-card-title>
            <v-card-text>Are you sure you want to delete "{{device.name}}"</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="confirmMenu = false">Cancel</v-btn>
              <v-btn text @click="deleteDevice">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>

      <!-- Edit fields -->
      <v-card-text class="mt-2" v-if="isEditing">
        <v-form v-model="valid" @submit.prevent>
          <!-- Device Name -->
          <v-text-field
            :disabled="!isEditing"
            :rules="nameRules"
            :counter="maxChars"
            v-model="newDeviceName"
            :placeholder="device.name"
            persistent-placeholder
            color="secondary"
            label="Device name"
          ></v-text-field>
          <!-- Select Room -->
          <v-autocomplete
            :disabled="!isEditing"
            :items="getRooms"
            item-text="name"
            v-model="roomPicked"
            :placeholder="device.room ? device.room.name : 'No Room'"
            persistent-placeholder
            color="secondary"
            label="Room"
          ></v-autocomplete>
        </v-form>
      </v-card-text>

      <!-- State and Action fields -->
      <v-card-text v-else>
        <!-- {{ deviceState }} -->
        <SpeakerDetails v-if="device.type.name == 'speaker'" :device="device"/>
        <LampDetails v-else-if="device.type.name == 'lamp'" :device="device"/>
        <AlarmDetails v-else-if="device.type.name == 'alarm'" :device="device"/>
        <OvenDetails v-else-if="device.type.name == 'oven'" :device="device"/>
        <ACDetails v-else-if="device.type.name == 'ac'" :device="device"/>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions v-show="isEditing">
        <v-spacer></v-spacer>
        <v-btn text @click="closeDialog()">Close</v-btn>
        <v-btn :disabled="!changed() || !valid" color="primary" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import SpeakerDetails from "@/components/devices/SpeakerDetails"
import LampDetails from "@/components/devices/LampDetails"
import AlarmDetails from "@/components/devices/AlarmDetails"
import OvenDetails from "@/components/devices/OvenDetails"
import ACDetails from "@/components/devices/ACDetails"

export default {
  components: {
    SpeakerDetails,
    LampDetails,
    AlarmDetails,
    OvenDetails,
    ACDetails,
  },

  props: {
    device: {
      required: true,
    },
  },

  data() {
    return {
      valid: false,
      isEditing: false,
      newDeviceName: "",
      minChars: 3,
      maxChars: 20,
      nameRules: [
        (v) => /^$|^[\w ]+$/.test(v) || "Invalid character",
        (v) => (v.length == 0 || (v.length >= this.minChars && v.length <= this.maxChars)) ||
          `Device name must be between ${this.minChars}-${this.maxChars} characters`,
        (v) => !/^[\s]+$/.test(v) || "Invalid device name",
      ],
      roomPicked: "",
      menu: false,
      confirmMenu: false,
    };
  },

  computed: {
    roomName() {
      let roomName = ""
      console.log(this.device)
      if (this.device.room) roomName = " - " + this.device.room.name
      return roomName
    },
    ...mapState("rooms", {
      rooms: (state) => state.rooms,
    }),
    ...mapGetters("rooms", {
      getRoomByName: "getRoomByName",
    }),
    getRooms() {
      let rooms = this.rooms.map((room) => {
        let name = room.name
        if (room.id == "all-devices") name = 'No Room'
        return { name: name }
      })

      let roomName
      // not linked to any room
      if (!this.device.room) roomName = 'No Room'
      else roomName = this.device.room.name

      return rooms.filter(room => room.name != roomName)
    },
    deviceState() {
      return this.device.state
    }
  },

  methods: {
    changed() {
      return (this.roomPicked && this.roomPicked != "") || this.newDeviceName != "";
    },
    ...mapActions("devices", {
      editDevice: "edit",
      $deleteDevice: "delete",
      getDeviceState: "getState",
    }),
    ...mapActions("rooms", {
      addDeviceToRoom: "addDevice", 
      removeDeviceFromRoom: "deleteDevice",
    }),
    async save() {
      // cambio de nombre
      if(this.newDeviceName != "") {
        console.log('new name:', this.newDeviceName)
        try {
          await this.editDevice({ 
            id: this.device.id, 
            name: this.newDeviceName, 
            meta: this.device.meta 
          })
        } catch (error) {
          console.error(error)
        }
      }

      // casos de cambio de cuarto:
      // 1- estaba sin cuarto y paso a un cuarto => link
      // 2- estaba en un cuarto y paso a sin cuarto => unlink
      // 3- estaba en un cuarto y paso a otro cuarto => unlink + link
      // 4- no cambio el cuarto
      let roomId
      if (!this.device.room) {
        if(this.roomPicked != "") {
          // link
          roomId = this.getRoomByName(this.roomPicked).id;
          await this.addDeviceToRoom({ roomId: roomId, deviceId: this.device.id })
        }
      } else if (this.roomPicked != "") {
        // unlink
        await this.removeDeviceFromRoom(this.device.id)
        if (this.roomPicked != "No Room") {
          // link
          roomId = this.getRoomByName(this.roomPicked).id;
          await this.addDeviceToRoom({ roomId: roomId, deviceId: this.device.id })
        }
      }

      this.$store.dispatch("setSnackbar", { show: true, text: "Device updated successfully" })

      this.isEditing = !this.isEditing;
      this.clear()
    },
    clear() {
      this.newDeviceName = ""
      this.roomPicked = ""
    },
    closeDialog() {
      this.menu = false
      this.clear()
    },
    async deleteDevice() {
      try{
        await this.$deleteDevice(this.device.id)
        console.log("Device deleted");
        this.menu = false
        this.confirmMenu = false
        this.$store.dispatch("setSnackbar", { show: true, text: "Device deleted" })
      } catch (error) {
        console.error(error)
      }
    },
  },
  async created() {
    try {
      await this.getDeviceState(this.device.id)
    } catch (error) {
      console.error(error)
    }
  }
};
</script>