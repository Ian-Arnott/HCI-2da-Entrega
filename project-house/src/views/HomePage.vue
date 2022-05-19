<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('@/assets/ProjectHouseLogo.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>
      <v-col class="mb-4">
        <h1 class="display-2 mb-3">Welcome to Project House</h1>

        <p class="subheading font-weight-regular">
          Manage your appliances from anywhere
        </p>
      </v-col>

      <v-col cols="12">
        <template>
          <v-tabs centered>
            <v-tab :to="{ name: 'Rooms' }">Home</v-tab>
            <v-tab :to="{ name: 'Routines' }">Routines</v-tab>
          </v-tabs>
        </template>
      </v-col>
      <v-col cols="12">
        <router-view :key="$route.path"/>
        <!-- Loading animation -->
        <LoadingAnimation v-show="loading"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoadingAnimation from "@/components/LoadingAnimation"

export default {
  title: 'Home - Project House',
  components: {
    LoadingAnimation,
  },
  computed: {
    loading() {
      return this.$store.getters["loading"];
    },
  },
};
</script>
