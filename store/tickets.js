// State
export const state = () => ({
    loading: false,
    tickets: []
})

// Actions
export const actions = {
    async tickets({ commit }) {
        commit('setLoading', true)
        await this.$axios.get(`/tickets`).then(response => {
            commit('setItem', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },
    async updateTickets({ commit, dispatch }, form) {
        commit('setLoading', true)
        await this.$axios.put(`/tickets`, form).then(response => {
            dispatch(tickets)
            commit('setLoading', false)
        }).catch(() => false)
    },
}

// Mutations
export const mutations = {
    setItem(state, data = Array) {
        state.tickets = data
    },
    setLoading: (state, type) => {
        state.loading = type
    }
}

// Getters
export const getters = {}