import { DeviceApi } from "@/api/devices";

export default {
    namespaced: true,

    state: {
        devices: []
    },

    // transformacion de la informacion
    getters: {
        getDeviceById: (state) => (deviceId) => {
            return state.devices.find(device => device.id == deviceId);
        },
        getDeviceByName: (state) => (name) => {
            return state.devices.find(device => device.name == name);
        },
        getDevicesByRoom: (state) => (room) => {
            if(room.id == "all-devices") return state.devices
            return state.devices.filter(device => device.room && device.room.id == room.id)
        },
        getDevicesByType: () => (type, devices) => {
            // let aux = devices
            // console.log('aux', aux)
            // if (!aux) aux = state.devices

            return devices.filter(device => device.type.id == type.id)
        },
        getActiveDevicesByRoom: (state, getters, rootState) => (room) => {
            let devices = [];

            if (room.id != "all-devices") {
                devices = state.devices.filter(device => device.room.id == room.id);
            } else {
                devices = state.devices;
            }

            return rootState.getters['rooms/getActiveDevices'](devices)
        },
    },

    // cambio del estado
    mutations: {
        setDevices(state, devices) {
            state.devices = devices
        },
    },

    // llamadas asincronicas al api
    actions: {
        async getAll({ commit, dispatch }) {
            const result = await DeviceApi.getAll()
            commit('setDevices', result)
            dispatch('rooms/getAll', null, { root: true })
            return result
        },
        async add({ dispatch }, device) {
            const result = await DeviceApi.add(device)
            dispatch('getAll')
            return result
        },
        async edit({ dispatch }, device) {
            const result = await DeviceApi.update(device)
            dispatch('getAll')
            return result
        },
        async delete({ dispatch }, id) {
            const result = await DeviceApi.delete(id)
            dispatch('getAll')
            return result
        },
        async getState({ dispatch }, id) {
            const result = await DeviceApi.getState(id)
            dispatch('getAll')
            return result
        },
        async action({ dispatch }, { id, actionName, params }) {
            const result = await DeviceApi.executeAction(id, actionName, params)
            dispatch('getState', id)
            return result
        },
    }
}