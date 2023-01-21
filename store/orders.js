// State
export const state = () => ({
    loading: false,
    orders: [],
    detail: []
})

// Actions
export const actions = {
    async orders({ commit }, status) {
        commit('setLoading', true)
        await this.$axios.get(`/admin-orders/${status}`).then(response => {
            commit('setItem', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },
    async updateOrder({ commit, dispatch }, form) {
        commit('setLoading', true)
        await this.$axios.put(`/admin-orders/confirm/${form.id}/status/${form.status}`).then(response => {
            if (response) {
                return true;
            } return false;
        }).catch(() => false)
    },
    async adminOrder({ commit }, form) {
        commit('setLoading', true);
        await this.$axios.post(`/admin/order`, form).then(response => {
            commit('setLoading', false)
            if (response) {
                return true;
            } return false;

        }).catch(() => false)
    },
    async ordersDetails({ commit }, form) {
        commit('setLoading', true);
        await this.$axios.get(`/admin-orders-detail/${form}`).then(response => {
            commit('setLoading', false)
            commit('detail', response.data)
        }).catch(() => false)
    }
}

// Mutations
export const mutations = {
    setItem(state, data = Array) {
        state.orders = data
    },
    setLoading: (state, type) => {
        state.loading = type
    },
    detail: (state, type) => {
        state.detail = type;
    }
}

// Getters
export const getters = {}