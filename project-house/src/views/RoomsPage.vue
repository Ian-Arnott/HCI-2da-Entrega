<template>
  <!-- <v-container fluid> -->

    <RoomList />
  <!-- </v-container> -->
</template>

<script>
import RoomList from "@/components/RoomList.vue";

export default {
  name: "RoomsTab",

  components: {
    RoomList,
  },
};
</script>