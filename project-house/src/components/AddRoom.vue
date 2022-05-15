<template>
  <!-- Dialog -->
  <v-dialog persistent v-model="opened" max-width="600px">
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
          <v-row v-if="title == 'Add Room'">
            <v-col>
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Room name"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-select
                v-model="type"
                :rules="typeRules"
                :items="typesRoom"
                item-text="name"
                label="Room type"
                required
              ></v-select>
            </v-col>
          </v-row>
        <v-container v-if="title == 'Add Device'">
          <v-row>
            <v-col>
              <v-text-field 
                v-model="name"
                :rules="nameRules"
                label="Device name"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                v-model="type"
                :rules="typeRules"
                :items="typesDevice"
                item-text="name"
                label="Device type"
                required
              ></v-select>
            </v-col>
            <v-col>
              <!-- Falta poner la lista de lo cuartos disponibles -->
              <v-select
                v-model="type"
                :rules="typeRules"
                :items="typesRoom" 
                item-text="name"
                label="Select room"
                required
              ></v-select>
            </v-col>              
          </v-row>
        </v-container>
      <v-container v-if="title == 'Add Routine'">
        <v-row>
          <v-col>
            <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Routine name"
                required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="auto">
            <v-text>Add new action</v-text>
          </v-col>
          <v-col>
            <v-btn color="primary"  icon outlined>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
            label="Select device"></v-select>
          </v-col>
          <v-col>
            <v-select
            label="Select action"></v-select>
          </v-col>
          <v-col cols="auto">
            <v-btn color="primary"  icon outlined>
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeDialog()"> Close </v-btn>
    <!-- Falta addDevice() y addRoutine() -->
        <v-btn v-if="title == 'Add Room'" :disabled="!valid" color="primary" @click="addRoom()">Add</v-btn>
        <v-btn v-if="title == 'Add Device'" :disabled="!valid" color="primary" @click="addRoom()">Add</v-btn>
        <v-btn v-if="title == 'Add Routine'" :disabled="!valid" color="primary" @click="addRoom()">Add</v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar v-model="snackbar.show" :timeout="2000">{{
      snackbar.text
    }}</v-snackbar>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import { Room } from "@/api/rooms";

export default {
  props: {
    title: String,
    icon: String
  },
  data() {
    return {
      valid: false,
      name: "",
      minChars: 3,
      maxChars: 60,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => /^[\w ]+$/.test(v) || "Invalid character",
        (v) => (v && v.length >= this.minChars && v.length <= this.maxChars) ||
          "Name must be between 3-60 characters",
      ],
      type: "",
      typeRules: [(v) => !!v || "Type is required"],
      typesRoom: [
        { name: "Kitchen", img: "kitchen.jpeg" },
        { name: "Bedroom", img: "bedroom.jpeg" },
        { name: "Living Room", img: "living-room.jpg" },
        { name: "Other", img: "empty-room.jpg" },
      ],
      typesDevice: [
        { name: "Light"},
        { name: "Speaker"},
        { name: "Air Conditioner"},
        { name: "Oven"},
        { name: "Alarm"}
      ],
      opened: false,
      snackbar: {
        show: false,
        text: "",
      },
    };
  },

  methods: {
    ...mapActions("rooms", {
      $addRoom: "add",
    }),
    async addRoom() {
      const img = this.types.find((type) => type.name == this.type).img;
      let room = new Room(null, this.name, { img: img });

      try {
        room = await this.$addRoom(room);
        room = Object.assign(new Room(), room);

        console.log(room);
        this.closeDialog()
        this.snackbar.text = "Room created succesfully";
      } catch (error) {
        switch (error.code) {
          case 1:
            this.snackbar.text = "Room Name must be at least 3 characters";
            break;
          case 2:
            this.snackbar.text = "Room already exists";
            break;
          default:
            this.snackbar.text = "Unexpected error";
            console.error(error);
        }
      } finally {
        this.snackbar.show = true;
      }
    },
    closeDialog() {
      this.opened = false;
      this.$emit('dialogClosed')
    }
  },
};
</script>