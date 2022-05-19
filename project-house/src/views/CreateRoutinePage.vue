<template>
  <v-container>
    <BackButton class="ml-4 pb-0" />

    <!-- Title -->
    <v-container class="text-center pa-0">
      <h1 class="display-1 ma-3">Create Routine</h1>
      <p class="subheading font-weight-regular">
        {{ routine.length }} devices
      </p>
    </v-container>

    <!-- Main actions -->
    <v-container>
      <v-row>
        <!-- Routine name -->
        <v-col class="ml-4" cols="4">
          <v-form v-model="valid" @submit.prevent>
            <v-text-field
              v-model="routineName"
              :rules="nameRules"
              :counter="maxChars"
              hint="Enter a name for your new routine"
              persistent-hint
              label="Name"
              single-line
              >
            </v-text-field>
          </v-form>
        </v-col>
        <!-- Pick device -->
        <v-col cols="4">
          <v-autocomplete
            v-model="selected"
            :hint="deviceHint(selected, items)"
            persistent-hint
            :items="items"
            item-text="name"
            label="Device"
            return-object
            single-line
          >
            <template v-slot:item="data">
              <v-list-item-avatar>
                <v-icon>{{ data.item.icon }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ data.item.name }}</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-autocomplete>
        </v-col>
        <!-- Add button -->
        <v-col>
          <v-dialog v-model="deviceSetUp" max-width="600px" @click:outside="closeDeviceSetup()">
            <template v-slot:activator="{ on, attrs }">
              <v-btn 
                v-bind="attrs" 
                v-on="on"
                :disabled="!canAdd()" 
                fab small color="primary"
                >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>

            <!-- Dialog content -->
            <v-card>
              <v-card-title>Device Set Up</v-card-title>
              <v-card-text class="text-center">
                <v-switch v-model="onOff" :label="switchLabel" @change="clearDeviceActions()"></v-switch>
              </v-card-text>
              <v-card-text class="text-center" v-if="device">
                <SpeakerDetails v-if="device.type.name == 'speaker'" 
                  :device="device" @action="saveAction" :disabled="true"/>
                <LampDetails v-else-if="device.type.name == 'lamp'" 
                  :device="device" @action="saveAction" :disabled="true"/>
                <!-- <AlarmDetails v-else-if="device.type.name == 'alarm'"
                  :device="device" @action="saveAction" :disabled="true"/> -->
                <OvenDetails v-else-if="device.type.name == 'oven'"
                  :device="device" @action="saveAction" :disabled="true"/>
                <ACDetails v-else-if="device.type.name == 'ac'" 
                  :device="device" @action="saveAction" :disabled="true"/>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="closeDeviceSetup()">cancel</v-btn>
                <v-btn color="primary" @click="saveDeviceState()">confirm</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <!-- Create routine button -->
        <v-col>
          <v-btn :disabled="!canCreate()" @click="createRoutine()" color="primary">CREATE</v-btn>
        </v-col>
        <LoadingAnimation v-show="loading" />
      </v-row>
    </v-container>

    <v-container fill-height class="mt-16 text-center" v-if="routine.length == 0">
      <v-col>
        <h1 class="display-1 mb-2">This routine is empty</h1>
        <v-label>Pick a device and click the 
          <v-icon class="mb-1">mdi-plus-circle</v-icon>
           button to customize your routine</v-label>
      </v-col>
    </v-container>
    <v-container v-else class="mt-4">
      <v-col>
        <v-subheader>Device Actions</v-subheader>
        <v-divider></v-divider>
      </v-col>
      <div class="items">
        <div class="item" v-for="item in routine" :key="item.device.name">
          <RoutineActionCard :item="item" @actionDeleted="deleteDeviceAction(item)"/>
        </div>
      </div>
      <!-- <v-row justify="start">
        <v-col cols="4" v-for="item in routine" :key="item.device.name">
          <RoutineActionCard
            :item="item"
            @actionDeleted="deleteDeviceAction(item)"
          />
        </v-col>
      </v-row> -->
    </v-container>
  </v-container>
</template>

<script>
import BackButton from "@/components/BackButton";
import RoutineActionCard from "@/components/RoutineActionCard";
import { mapActions, mapState } from 'vuex';

import SpeakerDetails from "@/components/devices/SpeakerDetails"
import LampDetails from "@/components/devices/LampDetails"
// import AlarmDetails from "@/components/devices/AlarmDetails"
import OvenDetails from "@/components/devices/OvenDetails"
import ACDetails from "@/components/devices/ACDetails"

import LoadingAnimation from "@/components/LoadingAnimation"

export default {
  title: "Create Routine - Project House",
  components: {
    BackButton,
    RoutineActionCard,
    SpeakerDetails,
    LampDetails,
    // AlarmDetails,
    OvenDetails,
    ACDetails,
    LoadingAnimation
  },
  data() {
    return {
      // routine name
      valid: false,
      routineName: "",
      minChars: 3,
      maxChars: 20,
      nameRules: [
        (v) => !!v || "Routine name is required",
        (v) => /^[\w ]+$/.test(v) || "Invalid character",
        (v) => (v && v.length >= this.minChars && v.length <= this.maxChars) ||
          `Routine name must be between ${this.minChars}-${this.maxChars} characters`,
        (v) => !/^[\s]+$/.test(v) || "Invalid Routine name",
      ],

      // action list
      routine: [],

      // device selection
      selected: null,

      // device set up (aux variables)
      deviceSetUp: false,
      onOff: true,
      deviceActions: [],

      loading: false,
    };
  },
  computed: {
      ...mapState("devices", {
          devices: (state) => state.devices
      }),
      items() {
          let deviceList = this.devices.map((device) => {
              return {
                  name: device.name,
                  id: device.id,
                  room: device.room ? device.room.name : null,
                  type: device.type.name,
                  icon: this.$store.getters['getDefaultDeviceIcon'](device.type.name)
              }
          })
          // sacar los que ya estan elegidos
          deviceList = deviceList.filter((device) => 
              !this.routine.find((item) => item.device.name == device.name)
          )

          // sacar las alarmas (no aceptamos alarmas en rutinas por seguridad)
          deviceList = deviceList.filter((device) => device.type != 'alarm')
          return deviceList
      },
      deviceHint: () => (selected, items) => {
          if(items.length <= 0) return "There are no devices to select"
          if(!selected) return "Select a device"
          return `${selected.name}${selected.room ? `, ${selected.room}` : ''}`
      },
      device() {
        if (!this.selected) return false
        return this.$store.getters['devices/getDeviceByName'](this.selected.name)
      },
      switchLabel() {
        if (!this.selected) return ""

        let text
        switch(this.selected.type) {
          case 'lamp':
          case 'oven':
          case 'ac':
            text = this.onOff ? 'be turned on' : 'be turned off'
            break
          case 'speaker':
            text = this.onOff ? 'start playing' : 'stop playing'
            break
          default:
            text = 'what is life?'
            break
        }
        return `When you run this routine '${this.selected.name}' will ${text}`
      },
  },
  methods: {
    canCreate() {
      return this.valid && this.routine.length > 0;
    },
    canAdd() {
      if (!this.selected) return false
      return !this.routine.find(
        (item) => item.device.name == this.selected.name
      );
    },
    next() {
        return this.items.length > 0 ? this.items[0] : null
    },
    closeDeviceSetup() {
      this.deviceSetUp = false
      this.selected = null
      this.deviceActions = []
    },
    clearDeviceActions() {
      if (!this.onOff) this.deviceActions = []
    },
    getMainAction() {
      if (!this.selected) throw new Error('no se selecciono nada')

      let action
      switch(this.selected.type) {
        case 'lamp':
        case 'oven':
        case 'ac':
          action = this.onOff ? 'turnOn' : 'turnOff'
          break
        case 'speaker':
          action = this.onOff ? 'play' : 'stop'
          break
        default:
          action = 'what is life?'
          break
      }
      return action
    },
    // 1- guardar temporalmente en device actions
    saveAction(data) {
      let action = this.deviceActions.find(action => action.actionName == data.actionName)
      if (action) {
        // console.log('Ya esta incluida esta accion, updating...')
        action.params = data.params
      } else {        
        this.deviceActions.push(data)
        // console.log('Agregando accion nueva...')
      }
    },
    // 2- Agregar a routine
    saveDeviceState() {
      // guardamos el device a rutina (routine)
      this.deviceActions.unshift({
        actionName: this.getMainAction()
      })
      this.routine.push({ device: this.selected, actions: this.deviceActions })

      this.closeDeviceSetup()
    },
    deleteDeviceAction(action) {
      this.routine = this.routine.filter(
        (item) => item.device.name != action.device.name
      );
    },
    ...mapActions("routines", {
      $createRoutine: "add",
    }),
    // 3- llamada a api
    async createRoutine() {
      let actions = []
      this.routine.forEach(item => {
        item.actions.forEach(action => {
          actions.push({
            device: { id: item.device.id }, 
            actionName: action.actionName, 
            params: action.params ? action.params : [],
            meta: {}
          })
        })
      });

      let routine = { name: this.routineName, actions: actions, meta: {} }

      let snackbar = { show: true, text: "" }
      this.loading = true
      try {
        await this.$createRoutine(routine)
        snackbar.text = "Routine created successfully"
      } catch (error) {
        console.error(error)
        snackbar.text = "Error creating routine"
      }

      this.loading = false
      this.closeDeviceSetup()
      this.routine = []
      this.$store.dispatch('setSnackbar', snackbar)
      this.$router.go(-1)
    }
  },
};
</script>

<style scoped>
.items {
  column-count: 3;
  column-gap: 10px;
  padding: 0 5px;
}

.item {
  display: inline-block;
  width: 100%;
  margin: 5px 0;
}

/* Make it responsive */
@media only screen and (max-width: 1000px) {
  .items {
    column-count: 4;
  }
}

@media only screen and (max-width: 800px) {
  .items {
    column-count: 3;
  }
}

@media only screen and (max-width: 600px) {
  .items {
    column-count: 2;
  }
}

@media only screen and (max-width: 400px) {
  .items {
    column-count: 1;
  }
}
</style>