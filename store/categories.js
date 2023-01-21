// State
export const state = () => ({
    loading: false,
    categories: []
})

// Actions
export const actions = {
    async categories({ commit }) {
        commit('setLoading', true)
        await this.$axios.get(`/categories`).then(response => {
            commit('setItem', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },
    async category({ commit }, id) {
        commit('setLoading', true)
        await this.$axios.get(`/categories/${id}`).then(response => {
            commit('setItem', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },
    async create({ commit }, data) {
        commit('setLoading', true)
        await this.$axios.post(`/categories`, data).then(response => {
            commit('setItem', response.data)
            commit('setLoading', false)
            this.$toast.success('ການສ້າງປະເພດສິນຄ້າສຳເລັດ')
            this.$router.push('/categories')
        }).catch(() => false)
    },
    async delete({ commit, dispatch }, data) {
        commit('setLoading', true)
        await this.$axios.delete(`/categories/${data}`).then(response => {
            commit('setItem', response.data)
            commit('setLoading', false)
            this.$toast.success('ການລົບຂໍ້ມູນສຳເລັດ')
            dispatch('categories')
        }).catch(() => false)
    },
    async update({ commit }, data) {
        commit('setLoading', true)
        await this.$axios.put(`/categories/${data.id}`, data).then(response => {
            commit('setLoading', false)
            this.$toast.success('ການແກ້ໄຂສຳເລັດ')
            this.$router.push('/categories')
        }).catch(() => false)
    },
}

// Mutations
export const mutations = {
    setItem(state, data = Array) {
        state.categories = data
    },
    setLoading: (state, type) => {
        state.loading = type
    }
}

// Getters
export const getters = {}