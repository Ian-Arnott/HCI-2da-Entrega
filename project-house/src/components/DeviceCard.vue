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
      deviceStates: this.$store.getters["deviceStates"]
    };
  },

  computed: {
    isActive() {
      console.log(`${this.device.name}: ${this.device.state.status}`);
      const inactiveStates = ['off', 'stopped', 'paused', 'disarmed']
      return !inactiveStates.includes(this.device.state.status);
    },
    icon() {
      const type = this.deviceStates.find(type => type.name == this.deviceType.name);
      return type.states.find(state => state.status == this.device.state.status).icon
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