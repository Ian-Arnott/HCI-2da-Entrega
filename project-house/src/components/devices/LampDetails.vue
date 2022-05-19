<template>
  <v-container>
    <v-icon size="100px" @click="onOff()">{{ icon }}</v-icon>
    <p>{{ device.state.status }}</p>
    <v-slider
      prepend-icon="mdi-brightness-6"
      :min="brightMin"
      :max="brightMax"
      v-model="brightness"
      @end="setBrightness()"
    >
    </v-slider>
    <v-row justify="center">
      <v-dialog v-model="colorMenu" max-width="300px">
        <template v-slot:activator="{ attrs, on }">
          <v-btn @mouseenter="hovered = true" @mouseleave="hovered = false" fab small :color="color" v-bind="attrs" v-on="on">
            <v-icon v-show="hovered || colorMenu" color="secondary">mdi-eyedropper</v-icon>
          </v-btn>
        </template>

        <v-card :ripple="false" id="colorPicker" @click="setColor()">
          <v-color-picker
            v-model="color"
            hide-inputs
            hide-mode-switch
            mode="rgba"
          ></v-color-picker>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    device: {
      required: true,
    },
  },
  data() {
    return {
      hovered: false,
      states: this.$store.getters['getDeviceStates']('lamp'),
      color: this.device.state.color,
      colorMenu: false,
      brightMin: 0,
      brightMax: 100,
      brightness: this.device.state.brightness,
    };
  },
  computed: {
    icon() {
      const state = this.states.find(
        (state) => state.status == this.device.state.status
      );
      return state ? state.icon : "mdi-lightbulb";
    },
  },
  methods: {
    ...mapActions("devices", {
      execute: "action",
      getState: "getState",
    }),
    async onOff() {
      let action = "turnOn";
      if (this.device.state.status == "on") {
        action = "turnOff";
      }
      await this.execute({ id: this.device.id, actionName: action });
    },
    async setBrightness() {
      await this.execute({ 
        id: this.device.id, 
        actionName: 'setBrightness',
        params: [this.brightness]   
      });
    },
    async setColor() {
      console.log('color', this.color)
      await this.execute({ 
        id: this.device.id, 
        actionName: 'setColor',
        params: [this.color]   
      });
    }
  },
  async created() {
    await this.getState(this.device.id)
  }
};
</script>

<style scoped>
#colorPicker {
  cursor: default;
}
</style>