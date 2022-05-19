<template>
  <v-card
    hover
    color="accent"
    ripple
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <v-toolbar flat color="accent">
      <v-toolbar-title>{{ `${item.device.name}${item.device.room ? ` - ${item.device.room}` : ""}` }}</v-toolbar-title>
      <!-- <v-subheader>{{ `${item.device.name}${item.device.room ? ` - ${item.device.room}` : ""}` }}</v-subheader> -->
      <v-spacer></v-spacer>
      <v-btn v-show="hovered" icon @click="deleteAction()">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list color="transparent" dense single-line>
      <v-list-item v-for="action in item.actions" :key="action.actionName" single-line>
        <v-icon class="mr-4" small>mdi-checkbox-marked</v-icon>
        <v-list-item-content color="secondary">
          <!-- <v-subheader> {{ getActionName(action.actionName) }}{{ action.params }}</v-subheader> -->
          {{ getActionName(action.actionName) }}{{ action.params }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
    
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
    getActionName(actionName) {
      return actionName;
      // switch () {

      // }
    },
  },
};
</script>