import { RoomApi } from "@/api/rooms"

export default {
    namespaced: true,

    state: {
        rooms: []
    },
    getters: {
        getRoomBySlug: (state) => (slug) => {
            return state.rooms.find(room => room.slug == slug);
        },
        getRoomById: (state) => (roomId) => {
            return state.rooms.find(room => room.id == roomId);
        },
        getRoomByName: (state) => (roomName) => {
            return state.rooms.find(room => room.name == roomName);
        },
    },
    actions: {
        async add({ dispatch }, room) {
            const result = await RoomApi.add(room)
            // validaciones
            // ...
            dispatch('getAll')
            return result
        },
        async edit({ dispatch }, room) {
            const result = await RoomApi.modify(room)
            dispatch('getAll')
            return result
        },
        async delete({ dispatch }, id) {
            const result = await RoomApi.delete(id)
            dispatch('getAll')
            return result
        },
        async get({ dispatch }, id) {
            const result = await RoomApi.get(id)
            dispatch('getAll')
            return result
        },
        async getAll({ commit }) {
            const result = await RoomApi.getAll()
            commit('update', result)
            return result
        },
        async getDevices({ getters, dispatch }, id) {
            const result = await RoomApi.getDevicesFromRoom(id)
            const room = getters.getRoomById(id)
            room.meta.deviceCount = result ? result.length : 0
            // TODO fijarse cuales estan activos y setearlos
            room.meta.activeDeviceCount = !result ? 0 : result.filter(device => device.state.status == "on").length
            console.log(result)
            dispatch('edit', room)
        },
        async addDevice({ dispatch }, { roomId, deviceId }) {
            const result = await RoomApi.addDeviceToRoom(roomId, deviceId)
            dispatch('getAll')
            return result
        },
        async deleteDevice({ dispatch }, deviceId) {
            const result = await RoomApi.deleteDeviceFromRoom(deviceId)
            dispatch('getAll')
            return result
        }
    },
    mutations: {
        update(state, rooms) {
            state.rooms = rooms
        },
    },
}