// State
export const state = () => ({
    loading: false,
    users: []
})

// Actions
export const actions = {
    async users({ commit }) {
        commit('setLoading', true)
        await this.$axios.get(`/users`).then(response => {
            commit('setItem', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },
    async login({ commit }, form) {
        commit('setLoading', true)
        console.log(this.$axios)
        await this.$axios.post(`/login-admin`, form).then(response => {
            if (response.data.token) {
                this.$cookies.set('token', response.data.token)
                this.$cookies.set('role', response.data.data.role)
                this.$router.push({ path: "/" })
            }
            commit('setLoading', false)
        }).catch(() => {
            this.$toast.error("ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ ")
            commit('setLoading', false)
        })
    },
    async deleteUser({ commit, dispatch }, id) {
        commit('setLoading', true)
        await this.$axios.delete(`/users/${id}`).then(response => {
            commit('setLoading', false)
            dispatch('users')
        }).catch(() => false)
    }
}

// Mutations
export const mutations = {
    setItem(state, data = Array) {
        state.users = data
    },
    setLoading: (state, type) => {
        state.loading = type
    }
}

// Getters
export const getters = {}