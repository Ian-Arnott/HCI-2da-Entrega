<template>
  <v-container>
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <v-container v-else-if="error" fill-height>
      <v-col>
        <h1 class="display-1 my-2">Oops, something went wrong</h1>
        <p>{{ error }}</p>
      </v-col>
    </v-container>
    <v-row v-else justify="center">
      <v-container v-show="routines.length == 0" fill-height>
        <v-col>
          <h1 class="display-1 my-2">Oops, this is empty</h1>
          <p>Click the button on the bottom right to add a routine</p>
        </v-col>
      </v-container>

      <v-col cols="auto" md="4" v-for="routine in routines" :key="routine.id">
        <RoutineCard :routine="routine"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RoutineCard from "../components/RoutineCard.vue";
import { mapActions, mapState } from 'vuex';

export default {
  title: 'Routines - Project House',
  
  components: { RoutineCard },
  name: "RoutinesPage",

  data() {
    return {
      loading: false,
      error: null,
    }
  },
  computed: {
    ...mapState("routines", {
      routines: (state) => state.routines,
    })
  },
  methods: {
    ...mapActions("routines", {
      getRoutines: "getAll"
    }), 
  },
  async created() {
    try {
      this.loading = true;
      await this.getRoutines();
      this.error = null;
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case 100:
        case 101:
          this.error =
            "Unable to establish connection with the server, please try again later";
          break;
        default:
          this.error = "Connection to server failed, please try again later";
          break;
      }
    } finally {
      this.loading = false;
    }
  },
};
</script>

