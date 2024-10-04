const Account = require('../app/models/Account.model')
const Cart = require('../app/models/Cart.model')

module.exports.checkCart = async (req, res, next) => {
    // let checkedLogin = await Account.findOne({ token: req.cookies.token })
    if (!req.cookies.cartId) {
        const cart = new Cart();
        cart.save();
        let time = 5 * 24 * 60 * 60 * 1000;
        res.cookie('cartId', cart.id, { expires: new Date(Date.now() + time) });
        next();
    }
    else {
        const cart = await Cart.findOne({ _id: req.cookies.cartId })
        const total = cart.products.reduce((sum, item) => sum + item.quantity, 0)
        cart.total = total;
        res.locals.cart = cart;
        next();

    }

}