// State
export const state = () => ({
    loading: false,
    rates: {
        info: {
            rate: 13900.00
        }
    }
})

// Actions
export const actions = {
    async rates({ commit }, form) {
        const myHeaders = new Headers();
        myHeaders.append("apikey", "Ml5oWKLW2JjQJUuoC2VkA6ShOS8f6K77");

        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };

        fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${form.to}&from=${form.from}&amount=${form.amount}`, requestOptions)
            .then(response => response.json())
            .then(result => commit('setItem', result))
            .catch(error => console.log('error', error));

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