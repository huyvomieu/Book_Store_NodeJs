const Product = require('../../models/Product.model')
const searchRegxHelper = require('../../../helpers/search')
const search = require('../../../helpers/search')
class SearchController {

    // [GET] /search
    async index(req, res, err) {
        if (!req.query) {
            res.redirect("back")
        }
        let find = {
            deleted: false,
            name: search(req.query)
        }
        let products = await Product.find(find)
        res.render('client/search/index',
            {
                title: "Tìm kiếm",
                titlePage: "Kết quả tìm kiếm",
                products: products,
            }
        )
    }
}

module.exports = new SearchController()
