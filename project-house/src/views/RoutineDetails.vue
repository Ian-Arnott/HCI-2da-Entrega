<template>
  <v-container>
    <BackButton class="ml-4 pb-0" />
    <v-container class="text-center pa-0">
      <h1 class="display-1 ma-3">{{ routine.name }}</h1>
      <p class="subheading font-weight-regular">
        {{
          routine.actions.length +
          `${routine.actions.length == 1 ? " action" : " actions"}`
        }}
      </p>
    </v-container>

    <!-- Loading -->
    <LoadingAnimation v-show="loading" />
    <v-container>
      <v-col>
        <v-subheader>Device Actions</v-subheader>
        <v-divider></v-divider>
      </v-col>

      <!-- Actions -->
      <v-row justify="start">
        <v-col cols="4" v-for="item in routineMapped" :key="item.device.name">
          <RoutineActionCard :item="item" disabled />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BackButton from "@/components/BackButton.vue";
import LoadingAnimation from "@/components/LoadingAnimation";
import RoutineActionCard from "@/components/RoutineActionCard";

export default {
  title() {
    return `${this.slug} - Project House`;
  },
  components: {
    BackButton,
    LoadingAnimation,
    RoutineActionCard,
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters("routines", {
      getRoutineByName: "getRoutineByName",
    }),
    ...mapGetters("devices", {
      getDeviceById: "getDeviceById",
    }),
    routine() {
      return this.getRoutineByName(this.slug);
    },
    routineMapped() {
      console.log("rutinita", this.routine);
      let routine = [];
      this.routine.actions.forEach((action) => {
        let item = routine.find(
          (item) => item.device.name == action.device.name
        );
        if (!item) {
          console.log("rutina mapeada vacia");
          routine.push({
            device: {
              name: action.device.name,
              room: action.device.room ? action.device.room.name : "",
            },
            actions: [
              {
                actionName: action.actionName,
                params: action.params,
              },
            ],
          });
        } else {
          item.actions.push({
            actionName: action.actionName,
            params: action.params,
          });
        }
      });

      return routine;
    },
  },
  methods: {
    ...mapActions("routines", {
      getRoutines: "getAll",
    }),
  },
  async created() {
    try {
      this.loading = true;
      await this.getRoutines();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
};
</script>