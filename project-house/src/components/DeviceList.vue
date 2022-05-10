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

    <p>{{ selected }}</p>

    <!-- <v-item-group v-model="selected" multiple> -->
    <v-container>
      <v-row>
        <v-col cols="auto" v-for="device in devices" :key="device.id">
          <DeviceCard
            :device="device"
            :deviceType="deviceType"
            @switched="toggleSelected(device.id)"
          />
        </v-col>
      </v-row>
    </v-container>
    <!-- </v-item-group> -->
  </v-container>
</template>

<script>
import api from "@/api/api.js";
import store from "@/plugins/store";

import DeviceCard from "@/components/DeviceCard.vue";

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
    devices() {
      return store.getters
        .getDevicesByRoom(this.room)
        .filter((device) => device.type == this.deviceType.name);
    },
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
        this.devices.forEach((device) => {
          api.setDeviceState(
            device.id,
            state,
            () => {
              var data = { deviceId: device.id, newState: state };
              store.commit("setDeviceState", data);
            },
            () => {
              console.error("Api error");
            }
          );
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
  },

  created() {
    // set up active devices as selected for the model to work properly
    this.devices.forEach((device) => {
      if (device.state > 0) this.selected.push(device.id.toString());
    });
  },
};
</script>