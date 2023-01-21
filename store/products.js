// State
export const state = () => ({
    loading: false,
    products: [],
    productsStockList: [],
    list: [],
    productsImage: [],
})

// Actions
export const actions = {
    async products({ commit }) {
        commit('setLoading', true)
        await this.$axios.get(`/products`).then(response => {
            commit('setProduct', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },
    async product({ commit }, id) {
        commit('setLoading', true)
        await this.$axios.get(`/products/${id}`).then(response => {
            commit('setProduct', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },
    async create({ commit }, form) {
        commit('setLoading', true)
        const formData = new FormData();
        for (const key in form) {
            if (key !== 'images') {
                formData.append(key, form[key]);
            }
        }

        for (const image of form.images) {
            formData.append("images", image);
        }

        await this.$axios.post(`/product-upload-images`, formData).then(() => {
            commit('setLoading', false)
            this.$router.push('/products')
            this.$toast.success('ການສ້າງສິນຄ້າສຳເລັດ')
        }).catch(() => false)
    },
    async delete({ commit }, form) {
        commit('setLoading', true)
        await this.$axios.delete(`/products/${form}`).then(response => {
            commit('setLoading', false)
            this.$toast.success('ການລົບຂໍ້ມູນສຳເລັດ')
        }).catch(() => false)
    },
    async update({ commit }, form) {
        commit('setLoading', true)

        const formData = new FormData();
        for (const key in form) {
            formData.append(key, form[key]);
        }

        await this.$axios.put(`/product-upload-image/${form.id}`, formData).then(response => {
            commit('setLoading', false)
            this.$router.push('/products')
            this.$toast.success('ການແກ້ໄຂຂໍ້ມູນສິນຄ້າສຳເລັດ')
        }).catch(() => false)
    },
    async productBarcode({ commit }, barcode) {
        commit('setLoading', true)
        const product = await this.$axios.get(`/products/barcode/${barcode}`).then(response => {
            commit('setProductStock', response.data)
            commit('setLoading', false)
            return response.data
        }).catch(() => false)
        return product;
    },
    addList({ commit }, data) {
        commit('list', data)
    },
    async addStock({ commit }, form) {
        commit('setLoading', true)

        await this.$axios.post(`/add-stock`, form).then(response => {
            commit('setLoading', false)
            this.$router.push('/products')
            this.$toast.success('ການເພີ່ມສິນຄ້າສຳເລັດ')
        }).catch(() => false)
    },
    async productImages({ commit }, form) {
        commit('setLoading', true)
        commit('productsImage', []);

        await this.$axios.get(`/product-image/${form}`).then(response => {
            commit('setLoading', false)
            commit('productsImage', response.data)
        }).catch(() => false)
    },
}

// Mutations
export const mutations = {
    setProduct(state, data = Array) {
        state.products = data
    },
    setLoading: (state, type) => {
        state.loading = type
    },
    setProductStock(state, data) {
        state.productsStockList = state.productsStockList.concat(data)
    },
    list(state, data) {
        state.list = data
    },
    productsImage(state, data) {
        state.productsImage = data
    }
}

// Getters
export const getters = {}