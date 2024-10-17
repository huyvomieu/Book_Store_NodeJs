const Product = require('../../models/Product.model');
const ProductCategory = require('../../models/ProductCategory.model');
const User = require('../../models/Role.model');

class HomeController {
    // [GET] /admin/dashboard
    async index(req, res, err) {

        const productsCount = await Product.countDocuments();
        const productsCount_acitve = await Product.countDocuments({ deleted: false });
        const productsCount_inacitve = await Product.countDocuments({ deleted: true });
        const products = {
            productsCount: productsCount,
            productsCount_acitve: productsCount_acitve,
            productsCount_inacitve: productsCount_inacitve,
        }
        const userCount = await User.countDocuments();
        const user_active = await User.countDocuments({ deleted: false });
        const user_inactive = await User.countDocuments({ deleted: true });
        const users = {
            userCount: userCount,
            user_active: user_active,
            user_inactive: user_inactive,

        }
        const productCategorysCount = await ProductCategory.countDocuments();
        const productCategory_active = await ProductCategory.countDocuments({ deleted: false });
        const productCategory_inactive = await ProductCategory.countDocuments({ deleted: true });
        const ProductCategories = {
            productCategorysCount: productCategorysCount,
            productCategory_active: productCategory_active,
            productCategory_inactive: productCategory_inactive,
        }

        res.render('admin/dashboard/index',
            {
                title: "dashboard",
                titlePage: "Tổng quan",
                products: products,
                ProductCategories: ProductCategories,
                users: users,
            }
        )
    }
}

module.exports = new HomeController