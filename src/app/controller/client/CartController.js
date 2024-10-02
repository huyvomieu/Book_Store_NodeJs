
const Product = require('../../Models/Product.model')
const ProductCategory = require('../../Models/ProductCategory.model')
const Cart = require('../../Models/Cart.model')
class CartController {

    // [GET] /cart
    index(req, res, err) {

        res.render('client/cart/index')

    }
    // [POST] /cart/add/:id
    async add(req, res, err) {
        let productId = req.params.id;
        let quantity = parseInt(req.body.quantity);
        let cartId = req.cookies.cartId;
        let cart = await Cart.findOne({ _id: cartId })

        let existProductInCart = cart.products.find(item => item.productId == productId)
        if (existProductInCart) {
            let quantityNew = quantity + existProductInCart.quantity
            await Cart.updateOne(
                {
                    _id: cartId,
                    "products.productId": productId
                },
                {
                    $set: {
                        "products.$.quantity": quantityNew
                    }
                }
            )
            // Cách 2
            // cart.products.forEach(item => {
            //     if (item.productId == productId) {
            //         item.quantity += quantity;
            //     }
            // });
            // await Cart.updateOne({ _id: cartId }, cart)
        }
        else {
            let objectCart = {
                productId: productId,
                quantity: quantity
            }
            await Cart.updateOne({ _id: cartId },
                {
                    $push: { products: objectCart }
                }
            )
        }
        req.flash('success', 'Thêm vào giỏ hàng thành công');
        res.redirect("back")

    }

}

module.exports = new CartController()
