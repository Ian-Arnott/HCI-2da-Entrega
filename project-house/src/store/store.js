import Vue from 'vue'
import Vuex from 'vuex'

import rooms from "./modules/rooms"
import devices from "./modules/devices"
import deviceTypes from "./modules/deviceTypes"
import routines from "./modules/routines"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connected: navigator.onLine, // variable del navegador
    snackbar: {
      show: false,
      text: ""
    },
    deviceStates: [
      {
        name: "lamp",
        states: [
          { status: "off", icon: "mdi-lightbulb-off" },
          { status: "on", icon: "mdi-lightbulb-on" }
        ],
        defaultIcon: 'mdi-lightbulb',
      },
      {
        name: "speaker",
        states: [
          { status: "stopped", icon: "mdi-speaker-off" },
          { status: "playing", icon: "mdi-speaker" },
          { status: "paused", icon: "mdi-speaker" },
        ],
        defaultIcon: 'mdi-speaker',
      },
      {
        name: "alarm",
        states: [
          { status: "armedStay", icon: "mdi-shield-home" },
          { status: "armedAway", icon: "mdi-shield-lock" },
          { status: "disarmed", icon: "mdi-shield-off" },
        ],
        defaultIcon: 'mdi-shield',
      },
      {
        name: "oven",
        states: [
          { status: "off", icon: "mdi-stove" },
          { status: "on", icon: "mdi-stove" }
        ],
        defaultIcon: 'mdi-stove',
      },
      {
        name: "ac",
        states: [
          { status: "off", icon: "mdi-air-conditioner" },
          { status: "on", icon: "mdi-air-conditioner" }
        ],
        defaultIcon: 'mdi-air-conditioner',
      }
    ]
  },
  getters: {
    connected: state => state.connected,
    snackbar: state => state.snackbar,
    deviceStates: state => state.deviceStates,
    getDeviceStates: (state) => (name) => {
      return state.deviceStates.find(s => s.name == name).states
    },
    getDefaultDeviceIcon: (state) => (name) => {
      return state.deviceStates.find(s => s.name == name).defaultIcon
    },
  },
  mutations: {
    'SET_CONNECTED'(state, payload) {
      state.connected = payload
    },
    'SET_SNACKBAR'(state, snackbar) {
      state.snackbar = snackbar
      state.snackbar.color = snackbar.color ? snackbar.color : 'snackbarDefault'
    }
  },
  actions: {
    setConnected({ commit }, payload) {
      commit('SET_CONNECTED', payload)
    },
    setSnackbar({ commit }, snackbar) {
      commit('SET_SNACKBAR', snackbar)
    }
  },
  modules: {
    rooms,
    devices,
    deviceTypes,
    routines
  }
})
