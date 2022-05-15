<template>
  <v-container
    v-show="devices.length > 0"
    @mouseenter="listHovered = true"
    @mouseleave="listHovered = false"
  >
    <v-list-item class="pa-0">
      <v-subheader>{{ deviceType.name }}</v-subheader>
      <v-switch
        v-model="selectAll"
        v-show="listHovered || selectAll"
        class="pa-0 ma-0"
        :id="`switch-${deviceType}`"
      >
      </v-switch>
    </v-list-item>
    <v-divider class="mb-2"></v-divider>

    <!-- <p>{{ selected }}</p> -->

    <!-- <v-item-group v-model="selected" multiple> -->
    <v-container>
      <v-row>
        <v-col cols="auto" v-for="device in devices" :key="device.id">
          <DeviceCard
            :device="device"
            :deviceType="deviceType"
            @switched="toggleSelected(device.id)"
          />
          <!-- <p>{{ device }}</p> -->
        </v-col>
      </v-row>
    </v-container>
    <!-- </v-item-group> -->
  </v-container>
</template>

<script>
import DeviceCard from "@/components/DeviceCard.vue";
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    deviceType: {
      required: true,
    },
    room: {
      required: true,
    },
  },

  components: {
    DeviceCard,
  },

  data() {
    return {
      listHovered: false,
      selected: [],
    };
  },

  computed: {
    ...mapGetters("devices", {
      getDevices: "getDevicesByRoom",
    }),
    devices() {
      return this.getDevices(this.room)
        .filter((device) => device.type.id == this.deviceType.id);
    },

    // propiedad computada que usa el switch para funcionar
    selectAll: {
      get() {
        return this.devices
          ? this.selected.length == this.devices.length
          : false;
      },
      set(value) {
        var selected = [];
        var state;

        if (value) {
          this.devices.forEach((device) => {
            selected.push(device.id.toString());
          });
          state = 1;
        } else {
          state = 0;
        }

        // llamada a api
        // const p = await Promise.all(this.devices.map(async (device) => {
        //   if (device.state == state) {
        //     console.log("No hay cambio de estado " + device.name);
        //     return;
        //   }

        // }))
        this.devices.forEach((device) => {
          // no llamo al api en este caso
          if (device.state == state) {
            console.log("No hay cambio de estado " + device.name);
            return;
          }

          // api.setDeviceState(
          //   device.id,
          //   state,
          //   () => { // ok
          //     var data = { deviceId: device.id, newState: state };
          //     store.commit("setDeviceState", data);
          //   },
          //   () => { // error
          //     console.error("Api error: " + device.name);
          //     // sacar de lista
          //     if (value) {
          //       selected = selected.filter((id) => id != device.id);
          //     } else {  // agregar a lista
          //       selected.push(device.id.toString());
          //     }
          //     this.selected = selected;
          //   }
          // );
        });

        this.selected = selected;
      },
    },
  },

  methods: {
    toggleSelected(deviceId) {
      if (this.selected.find((id) => id == deviceId)) {
        // remove
        this.selected = this.selected.filter((id) => id != deviceId);
      } else this.selected.push(deviceId.toString());
    },
    isActive(device) {
      const inactiveStates = ['off', 'stopped']
      return !inactiveStates.includes(device.state.status);
    },
    ...mapActions("devices", {
      executeAction: "action"
    })
  },

  created() {
    // set up active devices as selected for the model to work properly
    this.devices.forEach((device) => {
      if (this.isActive(device)) this.selected.push(device.id.toString());
    });
  },
};
</script>