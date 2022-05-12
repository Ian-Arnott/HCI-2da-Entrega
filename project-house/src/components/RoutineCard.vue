<template>
  <v-card
      hover
      shaped
      padless color="#C3F1A1"
      ripple
      @click="executeRoutine()"
      @mouseenter="routineHovered = true"
      @mouseleave="routineHovered = false"
      max-width="300"
      max-height="300"
  >
    <v-card-title>{{ routine }}</v-card-title>
    <v-card-text align="left">Action 1</v-card-text>
    <v-card-text align="left">Action 1</v-card-text>
    <v-card-actions v-show="routineHovered">
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn absolute top right icon @click.stop v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="executeRoutine()">Run</v-list-item>
          <v-list-item>Delete</v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
      routine: {
          required: true
      }
  },
  data() {
    return {
      routineHovered: null,
    };
  },

  methods: {
    executeRoutine() {
      console.log("Routine executed:", this.routine);
    },
  },
};
</script>