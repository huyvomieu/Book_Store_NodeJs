const home = require('./home.route')
const product = require('./product.route')
const me = require('./me.route')
const user = require('./user.route')
const productCategory = require('./product-category.route');
const search = require('./search.route');
const cart = require('./cart.route');
const checkout = require('./checkout.route');
const otp = require('./otp.route');

const cartMiddleware = require('../../midlewares/cart.middleware')
const userMiddleware = require('../../midlewares/user.middleware')
module.exports = (app) => {

    app.use(cartMiddleware.checkCart)
    app.use(userMiddleware)

    app.use('/product', product)
    app.use('/productCategory', productCategory)
    app.use('/me', me)
    app.use('/user', user)
    app.use('/search', search)
    app.use('/cart', cart)
    app.use('/checkout', checkout)
    app.use('/otp', otp)
    app.use('/', home)

}
