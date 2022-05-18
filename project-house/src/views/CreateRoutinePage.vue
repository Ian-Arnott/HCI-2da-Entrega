<template>
  <v-container>
    <BackButton class="ml-4 pb-0" />

    <!-- Title -->
    <v-container class="text-center pa-0">
      <h1 class="display-1 ma-3">Create Routine</h1>
      <p class="subheading font-weight-regular">
        {{ deviceActions.length }} devices
      </p>
    </v-container>

    <!--  -->
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-autocomplete
            v-model="selected"
            :hint="deviceHint(selected, items)"
            persistent-hint
            :items="items"
            item-text="name"
            label="Device"
            return-object
            single-line
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
          <v-btn :disabled="!canAdd()" fab small color="primary" @click="addDevice">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn :disabled="!canCreate()" @click="createRoutine()" color="primary">CREATE</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="mt-4 text-center" v-if="deviceActions.length == 0">
      <h1>Routine Empty</h1>
    </v-container>
    <v-container v-else class="mt-4">
      <v-row justify="center">
        <v-col cols="4" v-for="item in deviceActions" :key="item.device.name">
          <RoutineActionCard
            :item="item"
            @actionDeleted="deleteDeviceAction(item)"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import BackButton from "@/components/BackButton";
import RoutineActionCard from "@/components/RoutineActionCard";
import { mapState } from 'vuex';

export default {
  title: "Create Routine - Project House",
  components: {
    BackButton,
    RoutineActionCard,
  },
  data() {
    return {
      // device selection
      selected: null,
      deviceActions: [],
    };
  },
  computed: {
      ...mapState("devices", {
          devices: (state) => state.devices
      }),
      items() {
          let deviceList = this.devices.map((device) => {
              return {
                  name: device.name,
                  room: device.room ? device.room.name : null,
                  type: device.type.name,
                  icon: this.$store.getters['getDefaultDeviceIcon'](device.type.name)
              }
          })
          // sacar los que ya estan elegidos
          deviceList = deviceList.filter((device) => 
              !this.deviceActions.find((item) => item.device.name == device.name)
          )
          console.log('device list:', deviceList)
          return deviceList
      },
      deviceHint: () => (selected, items) => {
          if(items.length <= 0) return "There are no devices to select"
          if(!selected) return "Select a device"
          return `${selected.name}${selected.room ? `, ${selected.room}` : ''}`
      }
  },
  methods: {
    canCreate() {
      return this.deviceActions.length > 0;
    },
    canAdd() {
      if (!this.selected) return false
      return !this.deviceActions.find(
        (item) => item.device.name == this.selected.name
      );
    },
    next() {
        return this.items.length > 0 ? this.items[0] : null
    },
    addDevice() {
      if (!this.canAdd()) {
        this.$store.dispatch("setSnackbar", {
          show: true,
          text: "Device already added",
        });
        return;
      }
      let deviceAction = { device: this.selected, 
          actions: [
            {
              name: "Accion 1",
            },
            {
              name: "Accion 2",
              params: ["Parametro 1"],
            },
            {
              name: "Accion 3",
              params: ["Parametro 1"],
            },
          ], };
      this.deviceActions.push(deviceAction);
      this.selected = this.next()
    },
    deleteDeviceAction(action) {
      this.deviceActions = this.deviceActions.filter(
        (item) => item.device.name != action.device.name
      );
    },
    createRoutine() {
        // llamada a api
    }
  },
};
</script>