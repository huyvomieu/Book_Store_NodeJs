const home = require('./home.route')
const product = require('./product.route')
const me = require('./me.route')
const login = require('./login.route')
const productCategory = require('./product-category.route');
const search = require('./search.route');
const cart = require('./cart.route');

const cartMiddleware = require('../../midlewares/cart.middleware')
module.exports = (app) => {
    app.use(cartMiddleware.checkCart)

    app.use('/product', product)
    app.use('/productCategory', productCategory)
    app.use('/me', me)
    app.use('/auth', login)
    app.use('/search', search)
    app.use('/cart', cart)
    app.use('/', home)

}
