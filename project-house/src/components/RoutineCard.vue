<template>
  <v-card
    hover
    padless
    color="accent"
    ripple
    @click="executeRoutine()"
    @mouseenter="routineHovered = true"
    @mouseleave="routineHovered = false"
    class="text-left"
  >
    <v-card-text class="pa-0" fill-height>
      <v-list-item two-line>
        <v-list-item-avatar
          ><v-icon>mdi-timeline-text</v-icon></v-list-item-avatar
        >
        <v-list-item-content>
          <v-list-item-title>{{ routine.name }}</v-list-item-title>
          <v-list-item-subtitle
            >{{ routine.actions.length + `${routine.actions.length != 1 ? ' actions' : ' action'}` }}</v-list-item-subtitle
          >
        </v-list-item-content>
        <v-list-item-action>
          <v-menu v-model="contextMenu">
            <template v-slot:activator="{ on }">
              <v-btn v-show="routineHovered" absolute top right icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="executeRoutine()">
                <v-icon class="mr-4">mdi-check</v-icon>
                <v-list-item-title>Run</v-list-item-title>
              </v-list-item>
              <v-list-item disabled>
                <v-icon class="mr-4">mdi-mail</v-icon>
                <v-list-item-title>Details</v-list-item-title>
              </v-list-item>
              <!-- Delete confirmation dialog -->
              <v-dialog v-model="deleteMenu" max-width="300px">
                <template v-slot:activator="{ attrs, on}">
                  <v-list-item v-bind="attrs" v-on="on">
                    <v-icon class="mr-4">mdi-delete</v-icon>
                    <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>
                </template>

                <v-card dark color="warning">
                  <v-card-title>Delete Confirmation</v-card-title>
                  <v-card-text>Are you sure you want to delete {{routine.name}}?</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="closeDeleteConfirmation()">cancel</v-btn>
                    <v-btn text @click="deleteRoutine()">delete</v-btn>
                  </v-card-actions>
                </v-card>

              </v-dialog>
            </v-list>
          </v-menu>
        </v-list-item-action>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    routine: {
      required: true,
    },
  },
  data() {
    return {
      routineHovered: false,
      contextMenu : false,
      deleteMenu: false
    };
  },

  methods: {
    ...mapActions("routines", {
      $executeRoutine: "execute",
      $deleteRoutine: "delete",
    }),
    async executeRoutine() {
      let snackbar = { show: true, text: "" };
      try {
        await this.$executeRoutine(this.routine.id);
        snackbar.text = "Routine executed successfully";
      } catch (error) {
        snackbar.text = `There was an error executing routine ${this.routine.name}`;
        console.error(error);
      }
      this.$store.dispatch("setSnackbar", snackbar);
    },
    async deleteRoutine() {
      let snackbar = { show: true, text: "" };
      try {
        await this.$deleteRoutine(this.routine.id);
        snackbar.text = "Routine deleted successfully";
      } catch (error) {
        snackbar.text = `There was an error deleting routine ${this.routine.name}`;
        console.error(error);
      }
      this.$store.dispatch("setSnackbar", snackbar);
      this.closeDeleteConfirmation()
    },
    closeDeleteConfirmation() {
      this.deleteMenu = false
      this.contextMenu = false
    },
    getActionName(action) {
      let actionName;
      let deviceName = action.device.name;
      let roomName = action.device.room ? action.device.room.name : "";
      let paramName = action.params[0] ? action.params[0] : "";
      let unit = "";
      switch (action.actionName) {
        case "turnOn":
          actionName = "Turn on";
          break;
        case "turnOff":
          actionName = "Turn off";
          break;
        case "setMode":
          actionName = "Set";
          break;
        case "setTemperature":
          actionName = "Set";
          unit = "°C";
          break;
        // ac
        case "setVerticalSwing":
          actionName = "Set vertical swing";
          break;
        case "setHorizontalSwing":
          actionName = "Set horizontal swing";
          break;
        case "setFanSpeed":
          actionName = "Set fan speed";
          break;
        // light
        case "setBrightness":
          actionName = "Set brightness";
          unit = "%";
          break;
        case "setColor":
          actionName = "Set color";
          break;
        // speaker
        case "play":
          actionName = "Play";
          break;
        case "stop":
          actionName = "Stop";
          break;
        case "pause":
          actionName = "Pause";
          break;
        case "resume":
          actionName = "Resume";
          break;
        case "setGenre":
          actionName = "Set music genre";
          break;
        case "setVolume":
          actionName = "Set volume";
          break;
        case "nextSong":
          actionName = "Skip a track";
          break;
        case "previousSong":
          actionName = "Go back";
          break;
        // oven
        case "setConvection":
          actionName = "Set convection mode";
          break;
        case "setGrill":
          actionName = "Set grill mode";
          break;
        case "setHeat":
          actionName = "Set heat mode";
          break;
        default:
          actionName = "no se que paso";
          break;
      }

      actionName = `${actionName} '${deviceName}' ${
        roomName ? `(${roomName})` : ""
      } ${paramName ? `to ${paramName} ${unit ? unit : ""}` : ""}`;
      return actionName;
    },
  },
};
</script>