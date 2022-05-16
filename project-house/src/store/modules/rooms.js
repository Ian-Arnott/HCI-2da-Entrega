import { RoomApi } from "@/api/rooms"

export default {
    namespaced: true,

    state: {
        rooms: [],
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
        getActiveDevices: () => (devices) => {
            // TODO
            return !devices ? 0 : devices.filter(device => device.state.status == "on").length
        }
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
        async getAll({ commit, getters, rootState }) {
            const rooms = await RoomApi.getAll()
            let activeDeviceCount = 0

            for (let i = 0; i < rooms.length; i++) {
                const room = rooms[i];
                const devices = await RoomApi.getDevicesFromRoom(room.id)
                room.meta.deviceCount = devices ? devices.length : 0
                room.meta.activeDeviceCount = getters.getActiveDevices(devices)
                activeDeviceCount += room.meta.activeDeviceCount
                room.meta.editable = true
                console.log('Room id:', room.id)
            }

            const allDevices = {
                id: "all-devices",
                name: "All Devices",
                meta: {
                    deviceCount: rootState.devices.devices.length, 
                    activeDeviceCount: activeDeviceCount, 
                    editable: false,
                    img: 'home.jpg',
                }
            }

            rooms.unshift(allDevices)
            commit('update', rooms)
            return rooms
        },
        async addDevice({ dispatch }, { roomId, deviceId }) {
            const result = await RoomApi.addDeviceToRoom(roomId, deviceId)
            dispatch('devices/getAll', null, { root: true })
            return result
        },
        async deleteDevice({ dispatch }, deviceId) {
            const result = await RoomApi.deleteDeviceFromRoom(deviceId)
            dispatch('devices/getAll', null, { root: true })
            return result
        }
    },
    mutations: {
        update(state, rooms) {
            state.rooms = rooms
        },
    },
}