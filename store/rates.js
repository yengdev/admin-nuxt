// State
export const state = () => ({
    loading: false,
    rates: []
})

// Actions
export const actions = {
    async rates({ commit }) {
        commit('setLoading', true)
        await this.$axios.get(`/rates`).then(response => {
            commit('setItem', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },
    async createRates({ commit, dispatch }, form) {
        commit('setLoading', true)
        await this.$axios.post(`/rates`, form).then(response => {
            if (response.status === 200) {
                this.$toast.success('ການເພີ່ມຂໍ້ມູນສຳເລັດ')
                dispatch('rates')
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
        state.rates = data
    },
    setLoading: (state, type) => {
        state.loading = type
    }
}

// Getters
export const getters = {}