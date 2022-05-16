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
    }
  },
  getters: {
    connected: state => state.connected,
    snackbar: state => state.snackbar,
  },
  mutations: {
    'SET_CONNECTED'(state, payload) {
      state.connected = payload
    },
    'SET_SNACKBAR'(state, snackbar) {
      state.snackbar = snackbar
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
