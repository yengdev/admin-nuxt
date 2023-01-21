// State
export const state = () => ({
    loading: false,
    news: []
})

// Actions
export const actions = {
    async news({ commit }) {
        commit('setLoading', true)
        await this.$axios.get(`/news`).then(response => {
            commit('setItem', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },
    async aNews({ commit }, id) {
        commit('setLoading', true)
        await this.$axios.get(`/news/${id}`).then(response => {
            commit('setItem', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },
    async createNews({ commit }, form) {
        commit('setLoading', true)

        const formData = new FormData();
        for (const key in form) {
            formData.append(key, form[key]);
        }

        await this.$axios.post(`/news`, formData).then(response => {
            commit('setLoading', false)
            this.$router.push('/news')
        }).catch(() => false)
    },
    async deleteNews({ commit, dispatch }, id) {
        commit('setLoading', true)
        await this.$axios.delete(`/news/${id}`).then(response => {
            commit('setLoading', false)
            dispatch('news')
        }).catch(() => false)
    },
    async updateNews({ commit }, data) {
        commit('setLoading', true)
        const form = { ...data };
        form.image = form.editImage;
        delete form.editImage

        const formData = new FormData();
        for (const key in form) {
            formData.append(key, form[key]);
        }

        await this.$axios.put(`/news`, formData).then(response => {
            commit('setLoading', false)
            this.$router.push('/news')
        }).catch(() => false)
    },
}

// Mutations
export const mutations = {
    setItem(state, data = Array) {
        state.news = data
    },
    setLoading: (state, type) => {
        state.loading = type
    }
}

// Getters
export const getters = {}