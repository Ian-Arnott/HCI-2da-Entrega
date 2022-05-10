<template>
  <v-container >
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </template>
      <span>Back</span>
    </v-tooltip>
  </v-container>
</template>

<script>
export default {
  methods: {
    goBack() {
      return this.$router.go(-1);
    },
  },
};
</script>