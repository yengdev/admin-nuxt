// State
export const state = () => ({
    loading: false,
    ticket: {}
})

// Actions
export const actions = {
    async ticket({ commit }, id) {
        commit('setLoading', true)
        await this.$axios.get(`/verify-ticket/${id}`).then(response => {
            commit('setItem', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },
}

// Mutations
export const mutations = {
    setItem(state, data = Array) {
        state.ticket = data
    },
    setLoading: (state, type) => {
        state.loading = type
    }
}

// Getters
export const getters = {}