// State
export const state = () => ({
    loading: false,
    reports: false
})

// Actions
export const actions = {
    async reports({ commit }, params) {
        commit('setLoading', true)
        await this.$axios.get(`/reports`, { params }).then(response => {
            commit('setItem', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },
    async reportTickets({ commit }, params) {
        commit('setLoading', true)
        await this.$axios.get(`/report/tickets`, { params }).then(response => {
            commit('setItem', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },

    async reportSelfOrders({ commit }, params) {
        commit('setLoading', true)
        await this.$axios.get(`/report/self-orders`, { params }).then(response => {
            commit('setItem', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },
    async bestSeller({ commit }, params) {
        commit('setLoading', true)
        await this.$axios.get(`/report/best-sell`, { params }).then(response => {
            commit('setItem', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },
    async mostlyDone({ commit }, params) {
        commit('setLoading', true)
        await this.$axios.get(`/report/mostly-done`, { params }).then(response => {
            commit('setItem', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },
    async existingProduct({ commit }, params) {
        commit('setLoading', true)
        await this.$axios.get(`/report/existing`, { params }).then(response => {
            commit('setItem', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },
    async remainigTicket({ commit }, params) {
        commit('setLoading', true)
        await this.$axios.get(`/report/remaining-tickets`, { params }).then(response => {
            commit('setItem', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },

}

// Mutations
export const mutations = {
    setItem(state, data) {
        state.reports = data
    },
    setLoading: (state, type) => {
        state.loading = type
    }
}

// Getters
export const getters = {}