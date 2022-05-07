import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // variables de estado compartidas en toda la aplicacion
  state: {
    rooms: [],
  },

  // permite aplicar filtros a las colecciones de state
  getters: {
  },

  // definimos metodos que modifican las variables de estado mediante store.commit("setValue", newValue)
  mutations: {
    setRooms(state, rooms) {
      state.rooms = rooms
    },
  },
  actions: {
  },
  modules: {
  }
})
