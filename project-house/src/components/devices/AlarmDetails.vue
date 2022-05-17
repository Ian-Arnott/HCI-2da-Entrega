<template>
  <v-container>
    <v-icon size="100px">{{ statusIcon }}</v-icon>
    <p>{{ deviceStatus }}</p>
    <v-col>
      <!-- Set mode -->
      <v-dialog
        v-for="state in states"
        :key="state.status"
        v-model="state.passwordMenu"
        max-width="300px"
        @click:outside="resetPasswords()"
      >
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            :disabled="state.status == device.state.status"
            x-large
            icon
          >
            <v-icon large>{{ getIcon(state.status) }}</v-icon>
          </v-btn>
        </template>

        <!-- Password input -->
        <v-card dark color="warning">
          <v-card-title>{{ passwordMenuTitle(state.status) }}</v-card-title>
          <v-card-text>
            <v-subheader>Enter Security Code</v-subheader>
            <v-otp-input
              v-model="password"
              :length="passwordLength"
              type="password"
            ></v-otp-input>
            <v-overlay absolute :value="loading">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-overlay>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="!canConfirm" text @click="changeMode(state)"
              >confirm</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>

    <!-- Change code -->
    <v-col>
      <v-dialog
        v-model="changePasswordMenu"
        max-width="300px"
        @click:outside="resetPasswords()"
      >
        <template v-slot:activator="{ attrs, on }">
          <v-btn v-bind="attrs" v-on="on" color="primary">change code</v-btn>
        </template>

        <v-card dark color="warning">
          <v-card-title>Change Security Code</v-card-title>
          <v-card-text>
            <v-subheader>Current Code</v-subheader>
            <v-otp-input
              v-model="oldPassword"
              :length="passwordLength"
              type="password"
            ></v-otp-input>
            <v-subheader>New Code</v-subheader>
            <v-otp-input
              v-model="newPassword"
              :length="passwordLength"
              type="password"
            ></v-otp-input>
          </v-card-text>
          <v-overlay absolute :value="loading">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-overlay>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="!canChangeCode" text @click="changeSecurityCode()"
              >confirm</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
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
      states: this.$store.getters["getDeviceStates"]("alarm"),
      loading: false,
      password: "",
      passwordLength: 4,
      changePasswordMenu: false,
      oldPassword: "",
      newPassword: "",
    };
  },
  computed: {
    statusIcon() {
      return this.states.find(
        (state) => state.status == this.device.state.status
      ).icon;
    },
    deviceStatus() {
      switch (this.device.state.status) {
        case "armedStay":
          return "armed (home mode)";
        case "armedAway":
          return "armed (away mode)";
        case "disarmed":
          return "disarmed";
        default:
          return "disarmed";
      }
    },
    color: () => (status, device) => {
      return status == device.state.status ? "primary" : "";
    },
    canConfirm() {
      return this.password.length === this.passwordLength;
    },
    canChangeCode() {
      return (
        this.oldPassword.length === this.passwordLength &&
        this.newPassword.length === this.passwordLength &&
        this.oldPassword != this.newPassword
      );
    },
  },
  methods: {
    ...mapActions("devices", {
      execute: "action",
    }),
    getIcon(status) {
      let states = this.$store.getters["getDeviceStates"]("alarm");
      return states.find((state) => state.status == status).icon;
    },
    passwordMenuTitle(status) {
      let title;
      switch (status) {
        case "armedAway":
          title = "Arm (Away Mode)";
          break;
        case "armedStay":
          title = "Arm (Home Mode)";
          break;
        case "disarmed":
          title = "Disarm";
          break;
      }
      return title;
    },
    resetPasswords() {
        this.password = ""
        this.oldPassword = ""
        this.newPassword = ""
    },
    async changeMode(state) {
      let action;
      let snackbar = { show: true, text: "" };
      if (state.status == this.device.state.status) {
        snackbar.text = "Mode already set";
        this.$store.dispatch("setSnackbar", snackbar);
        return;
      }
      switch (state.status) {
        case "armedAway":
          action = "armAway";
          snackbar.text = `"${this.device.name}" armed in Away Mode`;
          break;
        case "armedStay":
          action = "armStay";
          snackbar.text = `"${this.device.name}" armed in Home Mode`;
          break;
        case "disarmed":
          action = "disarm";
          snackbar.text = `"${this.device.name}" disarmed`;
          break;
      }

      this.loading = true;
      const result = await this.execute({
        id: this.device.id,
        actionName: action,
        params: [this.password],
      });
      this.loading = false;

      if (!result) snackbar.text = "Wrong Code";

      this.$store.dispatch("setSnackbar", snackbar);

      this.password = "";
      if (result) state.passwordMenu = false;
    },
    async changeSecurityCode() {
      let snackbar = { show: true, text: "" };

      this.loading = true;
      const result = await this.execute({
        id: this.device.id,
        actionName: "changeSecurityCode",
        params: [this.oldPassword, this.newPassword],
      });
      this.loading = false;

      if (result) {
        snackbar.text = "Security code changed succesfully";
        this.changePasswordMenu = false;
      } else snackbar.text = "Wrong Code";

      this.$store.dispatch("setSnackbar", snackbar);
      this.oldPassword = "";
      this.newPassword = "";
    },
  },
};
</script>