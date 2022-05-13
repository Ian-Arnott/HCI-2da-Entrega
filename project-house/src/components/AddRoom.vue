<template>
  <!-- Dialog -->
  <v-dialog persistent v-model="opened" max-width="600px">
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
              <v-text-field label="New room name*" required></v-text-field>
            </v-col>
          </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="opened = false"> Close </v-btn>
        <v-btn color="primary" @click="opened = false"> Add New Room </v-btn>
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
        { state: "Speaker" },
        { state: "Light" },
        { state: "Oven" },
        { state: "Alarm" },
        { state: "Air Conditioning" },
      ],
      opened: false,
      title: "Add room", 
      icon: "mdi-bed", 
    };
  },
};
</script>