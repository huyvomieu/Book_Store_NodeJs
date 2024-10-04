
const Product = require('../../models/Product.model')
const ProductCategory = require('../../models/ProductCategory.model')
const Cart = require('../../models/Cart.model')
class CartController {

    // [GET] /cart
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

        res.render('client/cart/index',
            {
                title: "Giỏ hàng",
                titlePage: "Giỏ hàng",
                cartInfo: cart,
            }
        )

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
    // [GET] /cart/delete/:productId
    async delete(req, res, err) {
        const productId = req.params.productId
        const cartId = req.cookies.cartId;
        const cart = await Cart.updateOne(
            {
                _id: cartId
            },
            {
                $pull: {
                    products: { productId: productId }
                }
            }
        )
        req.flash('success', "Xóa khỏi giỏ hàng thành công!")
        res.redirect('back')

    }
    // [GET] /cart/update/:productId/:quantity
    async update(req, res, err) {
        const productId = req.params.productId
        const quantity = parseInt(req.params.quantity);
        const cartId = req.cookies.cartId;
        const cart = await Cart.updateOne(
            {
                _id: cartId,
                "products.productId": productId
            },
            {
                $set: {
                    "products.$.quantity": quantity
                }
            }
        )
        req.flash('success', "Cập nhật số lượng thành công!")
        res.redirect('back')

    }

}

module.exports = new CartController()
