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
          <v-row>
            <v-col>
              <v-text-field
                v-model="name"
                :rules="nameRules"
                :counter="maxChars"
                label="Room name"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-select
                v-model="type"
                :rules="typeRules"
                :items="types"
                item-text="name"
                label="Room type"
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeDialog()">Cancel</v-btn>
        <v-btn :disabled="!valid" color="primary" @click="addRoom()">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import { Room } from "@/api/rooms";

export default {
  data() {
    return {
      valid: false,
      name: "",
      minChars: 3,
      maxChars: 20,
      nameRules: [
        (v) => !!v || "Room name is required",
        (v) => /^[\w ]+$/.test(v) || "Invalid character",
        (v) => (v && v.length >= this.minChars && v.length <= this.maxChars) ||
          `Room name must be between ${this.minChars}-${this.maxChars} characters`,
        (v) => !/^[\s]+$/.test(v) || "Invalid room name",
        (v) => !/^All Devices$/.test(v) || "Invalid room name",
      ],
      type: "",
      typeRules: [(v) => !!v || "Room type is required"],
      types: this.$store.getters["rooms/getRoomTypes"],
      opened: false,
      title: "Add Room",
      icon: "mdi-bed",
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
      let room = new Room(null, this.name, { img: img, type: this.type });

      try {
        room = await this.$addRoom(room);
        room = Object.assign(new Room(), room);

        console.log(room);
        this.closeDialog()
        this.snackbar.text = "Room created successfully";
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
        this.$store.dispatch('setSnackbar', this.snackbar)
      }
    },
    closeDialog() {
      this.opened = false;
      this.type = ""
      this.name = ""
      this.$emit('dialogClosed')
    }
  },
};
</script>