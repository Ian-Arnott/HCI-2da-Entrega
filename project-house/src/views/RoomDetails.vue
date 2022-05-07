<template>
  <v-container>
    <h1 class="text-center">Room Details {{ id }}</h1>
  </v-container>
</template>

<script>
export default {
  name: "RoomDetails",

  props: {
    id: {
      type: String,
      required: true
    }
  }
};
</script>