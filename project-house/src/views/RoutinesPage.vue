<template>
  <v-container>
    <v-row justify="center">
      <v-container v-show="routines.length == 0" fill-height>
        <v-col>
          <h1 class="display-1 my-2">Oops, this is empty</h1>
          <p>Click the button on the bottom right to add a routine</p>
        </v-col>
      </v-container>

      <v-col cols="auto" md="6" v-for="routine in routines" :key="routine.id">
        <RoutineCard :routine="routine"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RoutineCard from "../components/RoutineCard.vue";
export default {
  components: { RoutineCard },
  name: "RoutinesPage",

  data() {
    return {
      routines: ["Routine 1", "Routine 2", "Routine 3"],
    };
  },
};
</script>

