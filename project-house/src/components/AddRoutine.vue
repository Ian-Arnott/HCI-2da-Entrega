<template>
  <!-- Dialog -->
  <v-dialog persistent v-model="opened" max-width="700px">
    <!-- Activador del Dialog (item del menu) -->
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-icon class="mr-4">{{ icon }}</v-icon>
        <v-list-item-title>{{ title }} </v-list-item-title>
      </v-list-item>
    </template>

    <!-- Contenido del Dialog -->
    <v-card>
      <v-card-title>
        <span class="text-h5">{{title}}</span>
      </v-card-title>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field required label="New Routine name*"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="auto">
            <v-text>Add new device</v-text>
          </v-col>
          <v-col>
            <v-btn color="primary"  icon outlined>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
            label="Select device"></v-select>
          </v-col>
          <v-col>
            <v-select
            label="Select action"></v-select>
          </v-col>
          <v-col cols="auto">
            <v-btn color="primary"  icon outlined>
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="opened = false"> Close </v-btn>
        <v-btn text @click="opened = false"> Create </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      select: { state: "Oven" },
      items: [
      ],
      opened: false,
      title: "Create Routine", 
      icon: "mdi-timeline-text", 
    };
  },
};
</script>