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
    <!-- More options -->
    <span absolute top right v-show="hovered">
      <DeviceDetails :device="device"/>    
    </span>
    
    <v-icon class="pt-2" x-large>{{ icon }}</v-icon>
    <v-card-text>{{ device.name }}</v-card-text>
  </v-card>
</template>

<script>
import DeviceDetails from "@/components/DeviceDetails.vue";

export default {
  components: { DeviceDetails },
  props: {
    device: {},
    deviceType: {},
  },

  data() {
    return {
      hovered: false,
      icons: [
        {
          name: "lamp",
          icons: [
            { status: "off", icon: "mdi-lightbulb-off" },
            { status: "on", icon: "mdi-lightbulb-on" }
          ]
        },
        {
          name: "speaker",
          icons: [
            { status: "stopped", icon: "mdi-speaker-off" },
            { status: "playing", icon: "mdi-speaker-on" }
          ]
        },
        {
          name: "alarm",
          icons: [
            { status: "disarmed", icon: "mdi-shield-off" },
            { status: "home", icon: "mdi-shield-home" },
            { status: "armed", icon: "mdi-shield" },
          ]
        },
        {
          name: "oven",
          icons: [
            { status: "off", icon: "mdi-stove" },
            { status: "on", icon: "mdi-stove" }
          ]
        },
        {
          name: "ac",
          icons: [
            { status: "off", icon: "mdi-air-conditioner" },
            { status: "on", icon: "mdi-air-conditioner" }
          ]
        }
      ]
    };
  },

  computed: {
    isActive() {
      console.log(`${this.device.name}: ${this.device.state.status}`);
      const inactiveStates = ['off', 'stopped', 'disarmed']
      return !inactiveStates.includes(this.device.state.status);
    },
    icon() {
      const type = this.icons.find(type => type.name == this.deviceType.name);
      return type.icons.find(icon => icon.status == this.device.state.status).icon
    }
  },

  methods: {
    switchDeviceState() {
      const newState = this.device.state > 0 ? 0 : 1;
      
      console.log(newState)

      // api.setDeviceState(
      //   this.device.id,
      //   newState,
      //   () => {
      //     let data = { deviceId: this.device.id, newState: newState };
      //     store.commit("setDeviceState", data);
      //     this.$emit("switched");
      //   },
      //   () => {
      //     console.error("Api error");
      //   }
      // );
    },

    setDeviceState(state) {
      let oldState = this.device.state;
      let newState = state;

      if (oldState == newState) {
        console.log('No hay cambio de estado');
        return;
      }

      // api.setDeviceState(
      //   this.device.id,
      //   newState,
      //   () => {
      //     let data = { deviceId: this.device.id, newState: newState };
      //     store.commit("setDeviceState", data);

      //     // si estaba apagado (0) y se prendio (>=1)
      //     // si estaba prendido (>=1) y se apago (0)
      //     if (oldState == 0 && newState >= 1 || oldState >= 1 && newState == 0) 
      //       this.$emit("switched");
      //   },
      //   () => {
      //     console.error("Api error");
      //   }
      // );
    },
  },
};
</script>