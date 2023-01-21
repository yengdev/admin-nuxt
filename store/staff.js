// State
export const state = () => ({
    loading: false,
    staffs: []
})

// Actions
export const actions = {
    async staffs({ commit }) {
        commit('setLoading', true)
        await this.$axios.get(`/admins`).then(response => {
            commit('setItem', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },
    async createStaffs({ commit, dispatch }, form) {
        commit('setLoading', true)
        await this.$axios.post(`/admins`, form).then(response => {
            if (response.status === 200) {
                this.$toast.success('ການເພີ່ມຂໍ້ມູນສຳເລັດ')
                dispatch('staffs')
            }
            commit('setLoading', false)
        }).catch(() => {
            commit('setLoading', false)
        })
    },
    async updateStatus({ commit, dispatch }, form) {
        commit('setLoading', true)
        await this.$axios.put(`/admins/${form.id}/${form.status}`).then(response => {
            if (response.status === 200) {
                this.$toast.success('ການແກ້ໄຂຂໍ້ມູນສຳເລັດ')
                dispatch('staffs')
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
        state.staffs = data
    },
    setLoading: (state, type) => {
        state.loading = type
    }
}

// Getters
export const getters = {}