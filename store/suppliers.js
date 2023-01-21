// State
export const state = () => ({
    loading: false,
    suppliers: []
})

// Actions
export const actions = {
    async suppliers({ commit }) {
        commit('setLoading', true)
        await this.$axios.get(`/suppliers`).then(response => {
            commit('setItem', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },
    async deleteSupplier({ commit, dispatch }, form) {
        commit('setLoading', true)
        await this.$axios.delete(`/suppliers/${form}`).then(response => {
            if (response.status === 200) {
                dispatch('suppliers')
            }
            commit('setLoading', false)
        }).catch(() => {
            commit('setLoading', false)
        })
    },
    async createSupplier({ commit, dispatch }, form) {
        commit('setLoading', true)
        await this.$axios.post(`/suppliers`, form).then(response => {
            if (response.status === 200) {
                dispatch('suppliers')
            }
            commit('setLoading', false)
        }).catch(() => {
            commit('setLoading', false)
        })
    },
}

// Mutations
export const mutations = {
    setItem(state, data = Array) {
        state.suppliers = data
    },
    setLoading: (state, type) => {
        state.loading = type
    }
}

// Getters
export const getters = {}