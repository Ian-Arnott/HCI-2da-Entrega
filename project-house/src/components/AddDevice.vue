<template>
  <!-- Dialog -->
  <v-dialog persistent v-model="opened" max-width="600px">
    <!-- Activador del Dialog (item del menu) -->
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-icon class="mr-4">{{ icon }}</v-icon>
        <v-list-item-title>{{ title }} </v-list-item-title>
      </v-list-item>
    </template>

    <!-- Contenido del Dialog -->
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" @submit.prevent>
          <v-row>
            <v-col>
              <!-- Device Name -->
              <v-text-field
                required
                clearable
                :rules="nameRules"
                :counter="maxChars"
                v-model="newDevice.name"
                color="secondary"
                label="Device name"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <!-- Select Type -->
              <v-autocomplete
                required
                :rules="typeRules"
                :items="supported"
                item-text="name"
                v-model="newDevice.type"
                label="Select type"
              >
                <template v-slot:item="data">
                  <v-list-item-avatar>
                    <v-icon>{{ data.item.icon }}</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ data.item.name }}</v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col>
              <!-- Select Room -->
              <v-autocomplete
                :items="rooms"
                item-text="name"
                placeholder="No room"
                persistent-placeholder
                hint="You can change this later"
                persistent-hint
                v-model="newDevice.room"
                label="Select room"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeDialog()">Cancel</v-btn>
        <v-btn :disabled="!valid" color="primary" @click="addDevice()">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { Device } from "@/api/devices"

export default {
  data() {
    return {
      select: { state: "Oven" },
      supported: [
        { name: "Speaker", icon: "mdi-speaker" },
        { name: "Lamp", icon: "mdi-lamp" },
        { name: "Oven", icon: "mdi-stove" },
        { name: "Alarm", icon: "mdi-shield-home" },
        { name: "AC", icon: "mdi-air-conditioner" },
      ],
      opened: false,
      valid: false,
      newDevice: {
        name: "",
        room: "",
        type: null,
      },
      minChars: 3,
      maxChars: 20,
      nameRules: [
        (v) => !!v || "Device name is required",
        (v) => /^[\w ]+$/.test(v) || "Invalid character",
        (v) => (v && v.length >= this.minChars && v.length <= this.maxChars) ||
          `Device name must be between ${this.minChars}-${this.maxChars} characters`,
        (v) => !/^[\s]+$/.test(v) || "Invalid device name",
      ],
      // roomRules: [(v) => !!v || "Room is required"],
      typeRules: [(v) => !!v || "Device type is required"],
      title: "Add Device",
      icon: "mdi-lightbulb",
      snackbar: {
        show: false,
        text: "",
      },
    };
  },
  computed: {
    ...mapState("rooms", {
      $rooms: (state) => state.rooms,
    }),
    rooms() {
      return this.$rooms.filter((room) => room.id != "all-devices")
    },
    ...mapState("deviceTypes", {
      types: (state) => state.deviceTypes,
    }),
    ...mapGetters("deviceTypes", {
      getDeviceTypeByName: "getByName",
    }),
    ...mapGetters("rooms", {
      getRoomByName: "getRoomByName",
    }),
  },
  methods: {
    ...mapActions("devices", {
      $addDevice: "add",
    }),
    ...mapActions("rooms", {
      addDeviceToRoom: "addDevice"
    }),
    async addDevice() {
      const type = this.getDeviceTypeByName(this.newDevice.type)
      let device = new Device(null, this.newDevice.name, { id: type.id }, {})
        
      try {
        device = await this.$addDevice(device)
        device = Object.assign(new Device(), device)

        console.log(device)
        if(this.newDevice.room) {
          const room = this.getRoomByName(this.newDevice.room)
          const result = await this.addDeviceToRoom({ roomId: room.id, deviceId: device.id})
          console.log('Link device to room:', result)
        }
        this.closeDialog()
        this.snackbar.text = "Device created succesfully"
      } catch (error) {
        switch (error.code) {
          case 1:
            this.snackbar.text = "Device Name must be at least 3 characters";
            break;
          case 2:
            this.snackbar.text = `Device "${this.newDevice.name}" already exists`;
            break;
          default:
            this.snackbar.text = "Unexpected error";
            console.error(error);
        }
      } finally {
        this.snackbar.show = true
        this.$store.dispatch('setSnackbar', this.snackbar)
      }
    },
    closeDialog() {
      this.opened = false;
      this.$emit('dialogClosed')
    }
  },
};
</script>