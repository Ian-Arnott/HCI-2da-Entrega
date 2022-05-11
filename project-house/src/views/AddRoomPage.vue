<template>
  <v-container fill-height >
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Add New Device</h1>
      </v-col>
    </v-row>
    <v-row align="center">
        <v-col cols="6">
            <v-subheader large>
                Item Type
            </v-subheader>
        </v-col>

        <v-col cols="6">
            <v-select
          v-model="select"
          :hint="`${select.state}`"
          :items="items"
          label="Select"
          return-object
          single-line
        ></v-select>
      </v-col>
    </v-row>

    <v-row align="center">
        <v-col cols="6">
            <v-subheader large>
                Select Room
            </v-subheader>
        </v-col>

        <v-col cols="6">
            <v-select
          v-model="select"
          :hint="`${select.state}`"
          :items="items"
          label="Select"
          return-object
          single-line
        ></v-select>
      </v-col>
    </v-row>
    <v-row align="center">
        <v-text-field label="Enter Device Name"></v-text-field>
    </v-row>    
    <v-row align="center">
        <v-btn>FINISH</v-btn>
    </v-row>   
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        select: { state: 'Oven'},
        items: [
          { state: 'Speaker'},
          { state: 'Light' },
          { state: 'Oven'},
          { state: 'Alarm'},
          { state: 'Air Conditioning'},
        ],
      }
    },
  }
</script>