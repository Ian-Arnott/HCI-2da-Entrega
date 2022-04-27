<template>
  <v-container>
    <v-container id="DeviceList">
      <DeviceList/>
    </v-container>
    <v-container id="RoutineList">
      <RoutineList/>
    </v-container>
    <v-container id="RoomList">
      <room-list/>
    </v-container>
  </v-container>
</template>
<script>
import DeviceList from "@/components/DeviceList";
import RoutineList from "@/components/RoutineList";
import RoomList from "@/components/RoomList";
export default {
  components: {RoomList, RoutineList, DeviceList}
}
</script>

<!-- color correcto a definir -->

<style>
  #RoutineList {
    background-color: lightgray;
  }
</style>