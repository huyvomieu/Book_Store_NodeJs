
const Product = require('../../models/Product.model')
const ProductCategory = require('../../models/ProductCategory.model')
const Cart = require('../../models/Cart.model')
const Order = require('../../models/Order.model')
class OrderController {

    // [GET] /checkout
    async index(req, res, err) {
        const cart = await Cart.findOne({ _id: req.cookies.cartId })
        const productList = [];
        if (cart.products.length > 0) {
            for (const item of cart.products) {
                const productInfo = await Product.findOne({ _id: item.productId }).select("name image price slug")
                item.productInfo = productInfo
                item.totalPrice = parseInt(productInfo.price) * item.quantity
            }
        }
        cart.totalPriceProduct = cart.products.reduce((sum, item) => sum += item.totalPrice, 0)

        res.render('client/checkout/index',
            {
                title: "Đặt hàng",
                titlePage: "Đặt hàng",
                cartInfo: cart,
            }
        )

    }
    // [POST] /checkout/order
    async order(req, res, err) {
        const cartId = req.cookies.cartId;
        const userInfo = req.body

        const products = [];
        const cart = await Cart.findOne({ _id: cartId })
        if (cart.products.length > 0) {
            for (const item of cart.products) {
                const productItem = await Product.findOne({ _id: item.productId })
                let product = {}
                product.productId = productItem.id;
                product.price = productItem.price;
                product.quantity = item.quantity;
                products.push(product)
            }
        }
        if (products.length < 1) {
            req.flash("erorr", "Đặt hàng Thất bại!")
            res.redirect("back")
            return;

        }
        const objectOrder = {
            userInfo: userInfo,
            products: products,

        }
        const order = new Order(objectOrder);
        order.save();
        await Cart.updateOne(
            {
                _id: cartId,
            },
            {
                products: []
            }
        )
        req.flash("success", "Đặt hàng thành công!")
        res.redirect(`/checkout/success/${order.id}`)

    }
    // [GET] /checkout/success/:id
    async success(req, res, err) {
        const orderId = req.params.id;

        const orderInfo = await Order.findOne({ _id: orderId })

        res.render('client/checkout/success',
            {
                title: "Đơn hàng",
                titlePage: "Thông tin đơn hàng",
                orderInfo: orderInfo,
            }
        )

    }

}
module.exports = new OrderController()
