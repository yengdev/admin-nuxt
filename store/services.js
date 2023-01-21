// State
export const state = () => ({
    loading: false,
    sliders: [],
    products: [],
    backgrounds: []
})

// app.put(`/sliders-sequence/:id`, controller.updateImage);

// Actions
export const actions = {
    // getting
    async sliders({ commit }) {
        commit('setLoading', true)
        await this.$axios.get(`/sliders`).then(response => {
            commit('sliders', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },
    async products({ commit }) {
        commit('setLoading', true)
        await this.$axios.get(`/recommended_products`).then(response => {
            commit('products', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },
    async backgrounds({ commit }) {
        commit('setLoading', true)
        await this.$axios.get(`/backgrounds`).then(response => {
            commit('backgrounds', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },
    // post
    async createSliders({ commit, dispatch }, form) {
        commit('setLoading', true)
        const formData = new FormData();
        for (const key in form) {
            formData.append(key, form[key]);
        }
        await this.$axios.post(`/sliders`, formData).then(response => {
            commit('setLoading', false)
            dispatch('sliders')
        }).catch(() => false)
    },
    async createProducts({ commit, dispatch }, form) {
        commit('setLoading', true)
        await this.$axios.post(`/recommended_products`, form).then(response => {
            commit('setLoading', false)
            dispatch('products')
        }).catch(() => false)
    },
    async createBackground({ commit, dispatch }, form) {
        commit('setLoading', true)
        const formData = new FormData();
        for (const key in form) {
            formData.append(key, form[key]);
        }
        await this.$axios.post(`/backgrounds`, formData).then(response => {
            dispatch('backgrounds')
            commit('setLoading', false)
        }).catch(() => false)
    },
    // deleting
    async deleteSliders({ commit, dispatch }, id) {
        commit('setLoading', true)
        await this.$axios.delete(`/sliders/${id}`).then(response => {
            commit('setLoading', false)
            dispatch('sliders')
        }).catch(() => false)
    },
    async deleteProducts({ commit, dispatch }, id) {
        commit('setLoading', true)
        await this.$axios.delete(`/recommended_products/${id}`).then(response => {
            commit('setLoading', false)
            dispatch('products')
        }).catch(() => false)
    },
    // updating 
    async updateSequence({ commit }, form) {
        commit('setLoading', true)
        await this.$axios.put(`/sliders-sequence/${form.id}`, form).then(response => {
            commit('setLoading', false)
        }).catch(() => false)
    }
}

// Mutations
export const mutations = {
    sliders(state, data = Array) {
        state.sliders = data
    },
    products(state, data = Array) {
        state.products = data
    },
    backgrounds(state, data = Array) {
        state.backgrounds = data
    },
    setLoading: (state, type) => {
        state.loading = type
    }
}

// Getters
export const getters = {}