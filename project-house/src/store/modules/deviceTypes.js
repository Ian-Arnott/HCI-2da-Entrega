import { DeviceTypeApi } from "@/api/deviceTypes"

export default {
    namespaced: true,

    state: {
        deviceTypes: []
    },
    getters: {
        getById: (state) => (id) => {
            return state.deviceTypes.find(type => type.id == id)
        },
        getByName: (state) => (name) => {
            return state.deviceTypes.find(type => type.name == name.toLowerCase())
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

            // const ids = result.map(type => {
            //     return {id: type.id, name: type.name}
            // })

            // console.log(ids)

            commit('update', result)
            return result
        }
    },
}