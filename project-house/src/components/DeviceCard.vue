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
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon absolute top right @click.stop v-bind="attrs" v-on="on" 
            :to="{name: 'DeviceDetails', params: {slug: device.slug}}">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <span>More</span>
      </v-tooltip>
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
      menu: false,
    };
  },

  computed: {
    isActive() {
      // if (this.device.state > 0) {
        console.log(`${this.device.name} ${this.device.state > 0 ? "active" : "inactive"}`);
      // }
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

    setDeviceState(state) {
      var oldState = this.device.state;
      var newState = state;

      if (oldState == newState) {
        console.log('No hay cambio de estado');
        return;
      }

      api.setDeviceState(
        this.device.id,
        newState,
        () => {
          var data = { deviceId: this.device.id, newState: newState };
          store.commit("setDeviceState", data);

          // si estaba apagado (0) y se prendio (>=1)
          // si estaba prendido (>=1) y se apago (0)
          if (oldState == 0 && newState >= 1 || oldState >= 1 && newState == 0) 
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