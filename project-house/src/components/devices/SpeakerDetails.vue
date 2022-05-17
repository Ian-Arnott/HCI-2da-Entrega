<template>
  <v-container>
    <v-icon size="100px" @click="stop()">{{ icon }}</v-icon>
    <p>{{ device.state.status }}</p>
    <p v-if="device.state.status != 'stopped'">
      {{device.state.song.title}} by
      {{device.state.song.artist}} -
      {{device.state.song.album}}
    </p>
    <!-- <p v-else>Not playing anything</p> -->
    <v-row>
      <v-col>
        <v-select
          :placeholder="genre"
          persistent-placeholder
          v-model="genre"
          :items="genres"
          label="Genre"
          @change="setGenre()"
        ></v-select>
      </v-col>
      <v-col>
        <v-btn large icon @click="prevSong()"><v-icon>mdi-skip-previous</v-icon></v-btn>
        <v-btn color="primary" large fab @click="playPause()"><v-icon large>{{ statusIcon }}</v-icon></v-btn>
        <v-btn large icon @click="nextSong()"><v-icon>mdi-skip-next</v-icon></v-btn>
      </v-col>
      <v-col>
        <v-slider
          class="mt-4"
          v-model="volume"
          :min="minVolume"
          :max="maxVolume"
          step="1"
          @end="setVolume()"
          :prepend-icon="mediaIcon"
        ></v-slider>
      </v-col>
      <v-col cols="12" v-if="device.state.status != 'stopped'">
            <v-label>{{ device.state.song.progress }} / </v-label>
            <v-label>{{ device.state.song.duration }}</v-label>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    device: {
      required: true,
    },
  },

  data() {
    return {
      states: this.$store.getters['getDeviceStates']('speaker'),
      volume: this.device.state.volume,
      minVolume: 0,
      maxVolume: 10,
      genre: this.device.state.genre,
      genres: ["Classical", "Country", "Dance", "Latina", "Pop", "Rock"],
    };
  },
  computed: {
    icon() {
      const state = this.states.find(
        (state) => state.status == this.device.state.status
      );
      return state ? state.icon : "mdi-speaker";
    },
    mediaIcon() {
      let icon = "mdi-volume-off"
      if (this.volume > 0) icon = "mdi-volume-low"
      if (this.volume >= 4) icon = "mdi-volume-medium"
      if (this.volume >= 7) icon = "mdi-volume-high"
      return icon
    },
    statusIcon() {
      let icon = "mdi-play"
      if (this.device.state.status == 'playing') icon = "mdi-pause"
      return icon
    },
    maxTime() {
      // convertir min:seg a numero
      let time = this.device.state.song.duration.split(/[.:]/);
      let mins = parseInt(time[0], 10)
      let secs = parseInt(time[1], 10)
      return mins * 60 + secs
    },
    timeValue() {
      let time = this.device.state.song.progress.split(/[.:]/);
      let mins = parseInt(time[0], 10)
      let secs = parseInt(time[1], 10)
      return mins * 60 + secs
    }
  },

  methods: {
    ...mapActions("devices", {
      execute: "action",
      getState: "getState",
    }),
    async stop() {
      await this.execute({ id: this.device.id, actionName: 'stop' })
    },
    async playPause() {
      let action
      switch (this.device.state.status) {
        case 'stopped':
          action = 'play'
          break;
        case 'paused':
          action = 'resume'
          break;
        default:
          action = 'pause'
          break;
      }
      await this.execute({ id: this.device.id, actionName: action })
      await this.updateStatus()
    },
    async prevSong() {
      await this.execute({ id: this.device.id, actionName: "previousSong" })
    },
    async nextSong() {
      await this.execute({ id: this.device.id, actionName: "nextSong" })
    },
    async setGenre() {
      console.log(this.genre)
      await this.execute({ 
        id: this.device.id, 
        actionName: "setGenre", 
        params: [this.genre.toLowerCase()] 
      })
    },
    async setVolume() {
      await this.execute({ 
        id: this.device.id, 
        actionName: "setVolume", 
        params: [this.volume] 
      })
    },
    // para simular el paso del tiempo
    async updateStatus() {
      try {
        const result = await this.getState(this.device.id)
        if (result.status == "playing") {
          setTimeout(this.updateStatus, 1000)
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  async created() {
    await this.updateStatus()
  }
};
</script>