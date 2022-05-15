import Vue from 'vue'
import Vuex from 'vuex'

import rooms from "./modules/rooms"
import devices from "./modules/devices"
import deviceTypes from "./modules/deviceTypes"
import routines from "./modules/routines"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connected: navigator.onLine // variable del navegador
  },
  getters: {
    connected: state => state.connected,
  },
  mutations: {
    'SET_CONNECTED' (state, payload) {
      state.connected = payload
    },
  },
  actions: {
    setConnected ({ commit }, payload) {
      commit('SET_CONNECTED', payload)
    },
  },
  modules: {
    rooms,
    devices,
    deviceTypes,
    routines
  }
})
