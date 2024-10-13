const Account = require('../app/models/Account.model')
const Cart = require('../app/models/Cart.model')

module.exports.checkCart = async (req, res, next) => {
    // Kiểm tra trình duyệt đã có giỏ hàng chưa, nếu có thì tiếp tục
    if (req.cookies.cartId) {
        const cart = await Cart.findOne({ _id: req.cookies.cartId })
        // Kiểm tra Trong CCDL có giỏ hàng này không
        if (cart) {
            const total = cart.products.reduce((sum, item) => sum + item.quantity, 0)
            cart.total = total;
            res.locals.cart = cart;
            next();
        }
        else {
            const cart = new Cart();
            await cart.save();
            let time = 5 * 24 * 60 * 60 * 1000;
            res.cookie('cartId', cart.id, { expires: new Date(Date.now() + time) });
            const total = cart.products.reduce((sum, item) => sum + item.quantity, 0)
            cart.total = total;
            res.locals.cart = cart;
            next();
        }
    }
    else {
        const cart = new Cart();
        await cart.save();
        let time = 5 * 24 * 60 * 60 * 1000;
        res.cookie('cartId', cart.id, { expires: new Date(Date.now() + time) });
        const total = cart.products.reduce((sum, item) => sum + item.quantity, 0)
        cart.total = total;
        res.locals.cart = cart;
        next();
    }


}