import Vue from 'vue'
import Vuex from 'vuex'

import rooms from "./modules/rooms"

Vue.use(Vuex)

export default new Vuex.Store({
  // variables de estado compartidas en toda la aplicacion
  state: {
    devices: [],
    routines: [],
    deviceTypes: []
  },

  // permite aplicar filtros a las colecciones de state
  getters: {
    getDeviceById: (state) => (deviceId) => {
      return state.devices.find(device => device.id == deviceId);
    },
    getDevicesByRoom: (state) => (room) => {
      if (room && room.id != 0) {
        return state.devices.filter(device => device.room == room.id);
      } else {
        return state.devices;
      }
    },
    getActiveDevicesByRoom: (state) => (room) => {
      var devices = [];

      if (room && room.id != 0) {
        devices = state.devices.filter(device => device.room == room.id);
      } else {
        devices = state.devices;
      }

      return devices.filter(device => device.state != 0);
    },
  },

  // definimos metodos que modifican las variables de estado mediante store.commit("setValue", newValue)
  mutations: {
    setDevices(state, devices) {
      state.devices = devices
    },
    setDeviceTypes(state, deviceTypes) {
      state.deviceTypes = deviceTypes
    },
    setDeviceState(state, { deviceId, newState }) {
      state.devices.find(device => device.id == deviceId).state = newState;
    },
    editDevice(state, { deviceId, deviceName, roomId }) {
      var device = state.devices.find(device => device.id == deviceId);
      device.name = deviceName;
      device.room = roomId;
    },
    deleteDevice(state, deviceId) {
      state.devices = state.devices.filter(device => device.id != deviceId);
    }
  },

  modules: {
    rooms,
  }
})
