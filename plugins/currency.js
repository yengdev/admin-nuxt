const currencyJs = require('currency.js');

export default (_ctx, inject) => {
    inject('currencyJs', currencyJs)
}