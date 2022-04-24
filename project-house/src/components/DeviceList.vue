<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <h1>Devices</h1>
        <v-btn class="mx-2" fab dark small color="primary">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <!-- Lista de dispositivos -->

        <v-sheet class="mx-auto" max-width="800">
          <v-slide-group v-model="model" class="pa-4" multiple show-arrows>
            <v-slide-item v-for="n in 15" :key="n" v-slot="{ active, toggle }">
              <v-card
                :color="active ? 'primary' : 'grey lighten-1'"
                class="ma-4"
                height="200"
                width="100"
                @click="toggle"
              >
                <v-row class="fill-height" align="center" justify="center">
                  <v-scale-transition>
                    <v-icon
                      v-if="active"
                      color="white"
                      size="48"
                      v-text="'mdi-close-circle-outline'"
                    ></v-icon>
                  </v-scale-transition>
                </v-row>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DeviceList",
  data: () => ({
    model: [],
  }),
};
</script>