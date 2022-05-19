import { RoutineApi } from "@/api/routines"

export default {
    namespaced: true,

    state: {
        routines: []
    },
    getters: {

    },
    mutations: {
        setRoutines(state, routines) {
            state.routines = routines
        }
    },
    actions: {
        async getAll({ commit }) {
            const result = await RoutineApi.getAll()
            commit('setRoutines', result)
            return result
        },
        async get({ dispatch }, id) {
            const result = await RoutineApi.get(id)
            dispatch('getAll')
            return result
        },
        async add({ dispatch }, routine) {
            const result = await RoutineApi.add(routine)
            dispatch('getAll')
            return result
        },
        async edit({ dispatch }, routine) {
            const result = await RoutineApi.edit(routine)
            dispatch('getAll')
            return result
        },
        async delete({ dispatch }, id) {
            const result = await RoutineApi.delete(id)
            dispatch('getAll')
            return result
        },
        async execute({ dispatch }, id) {
            const result = await RoutineApi.execute(id)
            dispatch('devices/getAll', null, { root: true })
            return result
        }
    },
}