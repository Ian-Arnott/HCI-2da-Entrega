<template>
  <v-container>
    <BackButton class="ml-4 pb-0" />
    <v-container class="text-center pa-0">
      <h1 class="display-1 ma-3">{{ device.name }}</h1>
      <p class="subheading font-weight-regular">{{ device }}</p>
    </v-container>
  </v-container>
</template>

<script>
import BackButton from "@/components/BackButton.vue";

// import api from "@/api/api.js";
import store from "@/plugins/store.js";

export default {
  
  components: {
    BackButton,
  },

  props: {
    slug: {
      type: String,
      required: true,
    },
  },

  computed: {
    device() {
      return store.getters.getDeviceBySlug(this.slug);
    },
  },
};
</script>