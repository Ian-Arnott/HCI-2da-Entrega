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
import { mapActions } from 'vuex';

export default {
  components: { DeviceDetails },
  props: {
    device: {},
    deviceType: {},
  },

  data() {
    return {
      hovered: false,
      deviceStates: this.$store.getters["deviceStates"],
      inactiveStates: ['off', 'stopped', 'paused', 'disarmed'],

    };
  },

  computed: {
    isActive() {
      // console.log(`${this.device.name}: ${this.device.state.status}`);
      return !this.inactiveStates.includes(this.device.state.status);
    },
    icon() {
      const type = this.deviceStates.find(type => type.name == this.deviceType.name);
      return type.states.find(state => state.status == this.device.state.status).icon
    }
  },

  methods: {
    ...mapActions("devices", {
      execute: "action",
    }),
    async switchDeviceState() {
      // todo habria que impedir el click y sacar el switch en device list
      if (this.device.type.name == 'alarm') return
      
      let action
      switch (this.device.state.status) {
        case 'off':
          action = 'turnOn'
          break;
        case 'on':
          action = 'turnOff'
          break;
        case 'stopped':
          action = 'play'
          break
        case 'paused':
          action = 'resume'
          break
        case 'playing':
          action = 'stop'
          break
        default:
          console.log('No deberia estar aca')
          break;
      }

      try {
        await this.execute({
          id: this.device.id,
          actionName: action,
        })
        this.$emit("switched");
      } catch (error) {
        console.error(error)
      }
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