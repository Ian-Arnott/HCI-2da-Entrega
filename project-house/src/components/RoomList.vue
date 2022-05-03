<template>
  <v-container>
    <v-row class="text-center" align="center" justify="center">
      <v-col cols="3">
        <h1>Rooms</h1>
        <v-btn class="mx-2" fab dark small color="primary" @click="addRoom">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </v-col>

      <!-- Lista de Cuartos -->
      <v-col cols="9">
        <v-sheet class="mx-auto" max-width="800">
          <v-slide-group v-model="model" class="pa-4" multiple show-arrows>
            <v-slide-item v-for="n in 15" :key="n" v-slot="{ active, toggle }">
              <router-link :to="{ name: 'RoomDetails', params: { id: n } }">
                <v-card
                  :color="active ? 'primary' : 'grey lighten-1'"
                  class="ma-4"
                  height="200"
                  width="100"
                  @click="toggle"
                >
                </v-card>
              </router-link>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "RoomList",

  data: () => ({
    model: [],
  }),

  methods: {
    addRoom() {
      console.log("Add room");
    },
  },
};
</script>