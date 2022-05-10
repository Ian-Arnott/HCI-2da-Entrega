<template>
  <v-card
    class="py-3"
    height="125px"
    width="125px"
    :color="isActive ? 'secondary' : ''"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @click="switchDeviceState()"
  >
    <v-icon class="pt-2" x-large>{{
      isActive ? deviceType.states[1].icon : deviceType.states[0].icon
    }}</v-icon>
    <v-card-text>{{ device.name }}</v-card-text>

    <v-card-actions v-show="hovered">
      <v-btn icon absolute top right @click.stop>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import api from "@/api/api.js";
import store from "@/plugins/store";

export default {
  props: {
    device: {},
    deviceType: {},
  },

  data() {
    return {
      hovered: false,
    };
  },

  computed: {
    isActive() {
      if (this.device.state > 0) {
        console.log(`${this.device.name} active`);
      }
      return this.device.state > 0;
    },
  },

  methods: {
    switchDeviceState() {
      var newState = this.device.state > 0 ? 0 : 1;

      api.setDeviceState(
        this.device.id,
        newState,
        () => {
          var data = { deviceId: this.device.id, newState: newState };
          store.commit("setDeviceState", data);
          this.$emit("switched");
        },
        () => {
          console.error("Api error");
        }
      );
    },
  },
};
</script>