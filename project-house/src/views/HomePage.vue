<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/ProjectHouseLogo.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Welcome Home</h1>

        <p class="subheading font-weight-regular">
          {{ username }}
        </p>
      </v-col>

      <v-col cols="12">
        <template>
          <v-tabs centered>
            <!-- La pestaña deberia llamarse Devices o Rooms? -->
            <v-tab :to="{ name: 'Rooms' }">Devices</v-tab>
            <v-tab :to="{ name: 'Routines' }">Routines</v-tab>
          </v-tabs>
        </template>
      </v-col>
      <v-col cols="12">
        <router-view :key="$route.path"/>
      </v-col>
    </v-row>    
  </v-container>
</template>

<script>

export default {
  // props: {
  //   username: String,
  // }

  components: {
  },

  data() {
    return {
      username: "Username",
    }
  }
};
</script>
