
const Product = require('../../Models/Product.model')
const ProductCategory = require('../../Models/ProductCategory.model')
class HomeController {

    // [GET] /product
    async index(req, res, err) {
        try {
            let finds = {
                deleted: false
            }
            const categories = await ProductCategory.find(finds).limit(6)
            const productsOutStand = await Product.find({ deleted: false, outstand: "1" }).limit(6)
            const products = await Product.find(finds)
            res.render('client/index',
                {
                    title: "Trang chủ",
                    products: products,
                    categories: categories,
                    productsOutStand: productsOutStand
                }
            )
        } catch (error) {
            req.flash('error', "Lỗi!")
        }



    }
}

module.exports = new HomeController()
