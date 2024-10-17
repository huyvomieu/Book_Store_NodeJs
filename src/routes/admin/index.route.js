const home = require('./home.router')
const product = require('./product.route')
const productCategory = require('./product-category.route')
const role = require('./role.route')
const account = require('./account.route')
const auth = require('./auth.route')
const setting = require('./setting.route')

const requireAuthMiddleware = require('../../midlewares/auth.middleware')
module.exports = (app) => {
    app.use('/admin/product', requireAuthMiddleware.requireAuth, product)
    app.use('/admin/productCategory', requireAuthMiddleware.requireAuth, productCategory)
    app.use('/admin/role', requireAuthMiddleware.requireAuth, role)
    app.use('/admin/account', requireAuthMiddleware.requireAuth, account)
    app.use('/admin/auth', auth)
    app.use('/admin/settings', requireAuthMiddleware.requireAuth, setting)
    app.use('/admin', requireAuthMiddleware.requireAuth, home)

}