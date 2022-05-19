<template>
  <v-card
    :disabled="disabled"
    :hover="!disabled"
    color="accent"
    :ripple="!disabled"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <v-toolbar flat color="accent">
      <v-toolbar-title>{{ `${item.device.name}${item.device.room ? ` - ${item.device.room}` : ""}` }}</v-toolbar-title>
      <!-- <v-subheader>{{ `${item.device.name}${item.device.room ? ` - ${item.device.room}` : ""}` }}</v-subheader> -->
      <v-spacer></v-spacer>
      <v-btn v-show="!disabled && hovered " icon @click="deleteAction()">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list color="transparent" dense single-line>
      <v-list-item v-for="action in item.actions" :key="action.actionName" single-line>
        <v-icon class="mr-4" small>mdi-checkbox-marked</v-icon>
        <v-list-item-content color="secondary">
          <!-- <v-subheader>{{ getItemName(action, item.device) }}</v-subheader> -->
          {{ getItemName(action, item.device) }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
    
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hovered: false,
    };
  },
  methods: {
    deleteAction() {
      this.$emit("actionDeleted");
    },
    getItemName(action, device) {
      let itemName;
      let deviceName = device.name;
      let roomName = device.room ? device.room.name : "";
      let paramName = (action.params && action.params[0]) ? action.params[0] : "";
      let unit = "";
      switch (action.actionName) {
        case "turnOn":
          itemName = "Turn on";
          break;
        case "turnOff":
          itemName = "Turn off";
          break;
        case "setMode":
          itemName = "Set";
          break;
        case "setTemperature":
          itemName = "Set";
          unit = "°C";
          break;
        // ac
        case "setVerticalSwing":
          itemName = "Set vertical swing";
          break;
        case "setHorizontalSwing":
          itemName = "Set horizontal swing";
          break;
        case "setFanSpeed":
          itemName = "Set fan speed";
          break;
        // light
        case "setBrightness":
          itemName = "Set brightness";
          unit = "%";
          break;
        case "setColor":
          itemName = "Set color";
          break;
        // speaker
        case "play":
          itemName = "Play";
          break;
        case "stop":
          itemName = "Stop";
          break;
        case "pause":
          itemName = "Pause";
          break;
        case "resume":
          itemName = "Resume";
          break;
        case "setGenre":
          itemName = "Set music genre";
          break;
        case "setVolume":
          itemName = "Set volume";
          break;
        case "nextSong":
          itemName = "Skip a track";
          break;
        case "previousSong":
          itemName = "Go back";
          break;
        // oven
        case "setConvection":
          itemName = "Set convection mode";
          break;
        case "setGrill":
          itemName = "Set grill mode";
          break;
        case "setHeat":
          itemName = "Set heat mode";
          break;
        default:
          itemName = "no se que paso";
          break;
      }

      itemName = `${itemName} '${deviceName}' ${roomName ? `(${roomName})` : ""
      } ${paramName ? `to ${paramName} ${unit ? unit : ""}` : ""}`;
      return itemName;
    },
  },
};
</script>