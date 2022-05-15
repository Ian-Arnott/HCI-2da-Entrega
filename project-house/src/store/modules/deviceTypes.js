import { DeviceTypeApi } from "@/api/deviceTypes"

export default {
    namespaced: true,

    state: {
        deviceTypes: []
    },
    getters: {
        getById: (state) => (id) => {
            return state.deviceTypes.find(type => type.id == id)
        }
    },
    mutations: {
        update(state, types) {
            state.deviceTypes = types
        }
    },
    actions: {
        async getAll({ commit }) {
            const result = await DeviceTypeApi.get()

            result.forEach(type => {
                type.name = type.name.charAt(0).toUpperCase() + type.name.slice(1) + 's'
            });
            
            commit('update', result)
            return result
        }
    },
}