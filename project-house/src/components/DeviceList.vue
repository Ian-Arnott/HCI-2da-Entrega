<template>
  <v-container>
    <v-row class="text-center" align="center" justify="center">
      <v-col cols="3">
        <h1>Devices</h1>
        <v-btn class="ma-4" fab dark small color="primary" @click="addDevice">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </v-col>

      <!-- Lista de dispositivos -->
      <v-col cols="9">
        <p v-show="devices.length == 0" >Empty list</p>
        <v-sheet class="mx-auto" max-width="800">
          <v-slide-group v-model="model" class="pa-4" multiple show-arrows>
            <v-slide-item v-for="device in devices" :key="device.id" v-slot="{ active, toggle }">
              <router-link class="text-decoration-none" :to="{ name: 'DeviceDetails', params: { id: device.id } }">
                <v-card
                  :color="active ? 'primary' : 'secondary'"
                  class="ma-2"
                  height="150"
                  width="150"
                  @click="toggle"
                >
                  <!-- Info del dispositivo -->
                  <v-icon light size="48" class="my-4"> mdi-lamp </v-icon>

                  <p class="my-2">{{ device.name }}</p> 
                  
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
  name: "DeviceList",

  data: () => ({
    model: [],  // lista de vue con items activados
    devices: [],
  }),

  methods: {
    addDevice() {
      console.log("Add device");
      let deviceId = this.devices.length + 1;
      this.devices.push({name: `Device name ${deviceId}`, id: deviceId });
    },
  },

  watch: {
    model () {
      console.log(this.model);
    }
  },
};
</script>