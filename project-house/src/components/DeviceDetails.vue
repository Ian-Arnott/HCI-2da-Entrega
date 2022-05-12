<template>
  <v-dialog v-model="menu" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon absolute right @click.stop v-bind="attrs" v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <!-- Dialog content -->
    <v-card class="text-center overflow-hidden" max-width="600px">
      <v-toolbar flat>
        <!-- <v-icon>mdi-lightbulb</v-icon> -->
        <v-toolbar-title class="text-h5">{{ device.name }} - {{ roomName }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- edit -->
        <v-btn icon @click="isEditing = !isEditing">
          <v-icon v-if="isEditing">mdi-close</v-icon>
          <v-icon v-else>mdi-pencil</v-icon>
        </v-btn>
        <!-- delete -->
        <v-btn icon @click="deleteDevice">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-toolbar>

      <!-- Edit fields -->
      <v-card-text class="mt-2" v-if="isEditing">
        <v-text-field
          :disabled="!isEditing"
          clearable
          counter="20"
          :placeholder="device.name"
          persistent-placeholder
          v-model="newDeviceName"
          color="secondary"
          label="Device name"
        ></v-text-field>
        <v-autocomplete
          :disabled="!isEditing"
          :items="rooms"
          v-model="roomPicked"
          color="secondary"
          item-text="name"
          label="Room"
        ></v-autocomplete>
      </v-card-text>

      <!-- Action fields -->
      <v-card-text v-else> LOAD ACTIONS ACCORDING TO DEVICE TYPE </v-card-text>

      <v-divider></v-divider>
      <v-card-actions v-show="isEditing">
        <v-spacer></v-spacer>
        <v-btn text @click="menu=false">Close</v-btn>
        <v-btn text :disabled="!changed()" @click="save">Save</v-btn>
      </v-card-actions>
      <!-- <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left>
        The device has been updated
      </v-snackbar> -->
    </v-card>
  </v-dialog>
</template>

<script>
// import api from "@/api/api.js";
import store from "@/plugins/store.js";

export default {
  components: {},

  props: {
    deviceId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      isEditing: false,
      hasSaved: false,
      newDeviceName: null,
      roomPicked: null,
      menu: false
    };
  },

  computed: {
    device() {
      return store.getters.getDeviceById(this.deviceId);
    },
    roomName() {
      var device = store.getters.getDeviceById(this.deviceId);
      if (device.room && device.room > 0)
        return store.getters.getRoomById(device.room).name;
      else return "Not linked to any room";
    },
    rooms() {
      return store.state.rooms;
    },
  },

  methods: {
    changed() {
      return this.roomPicked != null || this.newDeviceName != null;
    },
    save() {
      this.isEditing = !this.isEditing;
      this.hasSaved = true;

      var roomId;
      if (this.roomPicked == null) {
        // no se cambio el room pero si el device name
        roomId = this.device.room;
      } else {
        roomId = store.getters.getRoomByName(this.roomPicked).id;
      }

      var data = {
        deviceId: this.device.id,
        deviceName:
          this.newDeviceName == null ? this.device.name : this.newDeviceName,
        roomId: roomId,
      };

      // falta api call antes de llamar al store
      console.log(data);
      store.commit("editDevice", data);
      this.menu = false
    },

    deleteDevice() {
      // Falta pedir confirmacion
      store.commit("deleteDevice", this.deviceId);
      console.log("Device deleted");
      this.menu = false
    },
  },
};
</script>