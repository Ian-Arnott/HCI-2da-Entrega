<template>
  <v-container>
    <h1 class="text-center">Room Details {{ name }}</h1>
  </v-container>
</template>

<script>
export default {
  name: "RoomDetails",

  props: {
    name: {
      type: String,
      required: true
    }
  }
};
</script>