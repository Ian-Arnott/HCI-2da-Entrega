<template>
  <v-card @mouseenter="hovered = true" @mouseleave="hovered = false">
    <v-card-title>{{
      `${item.device.name}${item.device.room ? ` - ${item.device.room}` : ""}`
    }}</v-card-title>
    <v-card-text>
      <v-list></v-list>
      <v-row>
        <v-col cols="auto" v-for="action in item.actions" :key="action.name">
          <v-subheader>{{ action.name }} {{ action.params }}</v-subheader>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions v-show="hovered">
      <v-btn absolute top right icon @click="deleteAction()"
        ><v-icon>mdi-delete</v-icon></v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      required: true,
    },
  },
  data() {
    return {
      hovered: false,
    };
  },
  methods: {
    deleteAction() {
      this.$emit("actionDeleted");
    },
  },
};
</script>