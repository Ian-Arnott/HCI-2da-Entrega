<template>
  <!-- Dialog -->
  <v-dialog persistent v-model="opened" max-width="700px">
    <!-- Activador del Dialog (item del menu) -->
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-icon class="mr-4">{{ icon }}</v-icon>
        <v-list-item-title>{{ title }} </v-list-item-title>
      </v-list-item>
    </template>

    <!-- Contenido del Dialog -->
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" @submit.prevent>
          <!--Routine Name-->
          <v-row>
            <v-col>
              <v-text-field
                v-model="name"
                :rules="nameRules"
                :counter="maxChars"
                label="Routine name"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn @click="addAction()"  outlined>
              ADD ACTION
              </v-btn>
            </v-col>
          </v-row>
          <v-container>
            <v-list-item v-for="(action, index) in routineDevices" :key="action">
            <v-row>
              <v-col>
                <v-select
                v-model="routineDevices[index]"
                :rules="deviceRules"
                :items="devices"
                item-text="name"
                label="Device"
                required
                ></v-select>
              </v-col>
              <v-col v-if="routineDevices[index]!=''">
                <v-select
                v-model="actions[index]"
                :rules="actionRules"
                :items="devices"
                item-text="name"
                label="Action"
                required
                ></v-select>
              </v-col>
              <v-col v-if="actions[index]!=''">
                <v-text-field
                v-model="parameters[index]"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-btn icon @click="removeAction(index)" outlined>
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-list-item>
          </v-container>

        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeDialog()"> Close </v-btn>
        <v-btn :disabled="!valid" color="primary" @click="addRoutine()">Add</v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar v-model="snackbar.show" :timeout="2000">{{
      snackbar.text
    }}</v-snackbar>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";


export default {
  computed: {
    ...mapState("devices", {
      devices: (state) => state.devices,
    }),
  },
  data() {
    return {
      routineDevices: [],
      actions: [],
      parameters: [],
      name: "",
      minChars: 3,
      maxChars: 20,
      nameRules: [
        (v) => !!v || "Routine name is required",
        (v) => /^[\w ]+$/.test(v) || "Invalid character",
        (v) => (v && v.length >= this.minChars && v.length <= this.maxChars) ||
          `Routine name must be between ${this.minChars}-${this.maxChars} characters`,
      ],
      type: "",
      deviceRules: [(v) => !!v || "Device is required"],
      actionRules: [(v) => !!v || "Action is required"],      
      types: [
        { name: "Kitchen", img: "kitchen.jpeg" },
        { name: "Bedroom", img: "bedroom.jpeg" },
        { name: "Living Room", img: "living-room.jpg" },
        { name: "Other", img: "empty-room.jpg" },
      ],
      valid: false,
      opened: false,
      title: "Add Routine",
      icon: "mdi-timeline-text",
      snackbar: {
        show: false,
        text: "",
      },
    };
  },
  methods: {
    addAction() {
      this.routineDevices.push("")
      this.actions.push("")
      this.parameters.push("")

    },
    removeAction(index) {
      this.routineDevices.splice(index, 1)
      this.actions.splice(index, 1)
      this.parameters.splice(index, 1)

    },

    closeDialog() {
      this.routineDevices.splice(0,this.routineDevices.length)
      this.actions.splice(0,this.actions.length)
      this.parameters.splice(0,this.parameters.length)
      this.name = ""
      this.opened = false;
      this.$emit('dialogClosed')
    }
  },
};
</script>