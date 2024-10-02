const Product = require('../../models/Product.model')
const ProductCategory = require('../../models/ProductCategory.model')
const pagination = require('../../../helpers/pagination')
class ProductController {

    // [GET] admin/product/
    async index(req, res, err) {

        let finds = {
            deleted: "false"
        }
        let sort = {

        }
        let objectPagination = {
            limitItems: 4,
            currentPage: 1,
            skip: 0,
        }
        if (req.query.university) {
            finds.university = req.query.university
        }

        if (req.query.keyword)
            finds.name = search(req.query)
        if (req.query.sortKey && req.query.sortValue) {
            sort[req.query.sortKey] = req.query.sortValue
        }
        let countPage = await Product.countDocuments(finds);
        if (req.query.keyword) {
            countPage = await Product.where({ name: search(req.query) }).countDocuments();
        }
        if (req.query.page) {
            objectPagination.currentPage = parseInt(req.query.page)
            objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems

        }
        await Product.find(finds).skip(objectPagination.skip).sort(sort)
            .then((books) => {
                pagination(objectPagination, finds, req, countPage, books.length)
                return books;
            })
            .then((books) => {
                res.render('admin/product/index', {
                    title: "product",
                    books: books.slice(0, objectPagination.limitItems),
                    keyword: req.query.keyword,
                    pagination: objectPagination
                })
            })
            .catch(err)
    }
    // [GET] admin/product/create
    async create(req, res, next) {
        const categories = await ProductCategory.find({ deleted: false })
        res.render('admin/product/create',
            {
                title: "product",
                categories: categories,
            }
        )
    }

    // [POST] admin/product/store
    async store(req, res, err) {
        req.body.createdBy = {
            account_id: res.locals.user._id
        }
        const product = new Product(req.body)
        await product.save()
            .then(() => {
                req.flash('success', 'Thêm sản phẩm thành công');
                res.redirect("back")
            })
            .catch(err)

    }

    // [GET] admin/product/edit/:id
    async edit(req, res, next) {
        const book = await Product.findOne({ _id: req.params.id })
        const categories = await ProductCategory.find({ deleted: false })
        res.render('admin/product/edit', {
            title: "product",
            book: book,
            categories: categories,
        })
    }
    // [PATCH] admin/product/update/:id
    update(req, res, next) {
        const updatedBy = {
            account_id: res.locals.user._id,
            updatedAt: new Date()
        }
        Product.updateOne(
            { _id: req.params.id },
            {
                ...req.body,
                $push: { updatedBy: updatedBy }
            })
            .then(() => {
                req.flash('success', 'Lưu thành công');
                res.redirect('back')
            })
            .catch(next)
    }
    // [PATCH] admin/product/restore/:id
    restore(req, res, next) {
        Product.findOneAndUpdate({ _id: req.params.id }, { deleted: false })
            .then(() => {
                req.flash('success', 'Khôi phục thành công');
                res.redirect('back')
            })
            .catch(next)
    }
    // [DELETE] admin/product/delete/:id
    delete(req, res, next) {
        let deletedBy = {
            account_id: res.locals.user._id,
            deletedAt: new Date()
        }
        Product.findByIdAndUpdate({ _id: req.params.id }, { $set: { deleted: true, deletedBy: deletedBy } })
            .then(() => {
                req.flash('success', 'Xóa sản phẩm thành công');
                res.redirect('back')
            })
            .catch(next)
    }
    // [DELETE] admin/product/deleteVV/:id
    deleteVV(req, res, next) {
        Product.findByIdAndDelete({ _id: req.params.id })
            .then(() => {
                req.flash('success', 'Xóa sản phẩm thành công');
                res.redirect('back')
            })
            .catch(next)
    }
    // [DELETE] admin/product/deleteMulti
    deleteMulti(req, res, next) {
        // res.send("OK")
        const ArrayIdDelete = req.body.ids.split(',')
        Product.updateMany(
            {
                _id: {
                    $in: ArrayIdDelete
                }
            },
            {
                deleted: true,
                deletedAt: new Date()
            }
        )
            .then(() => {
                req.flash('success', `Xóa ${ArrayIdDelete.length} sản phẩm thành công`);
                res.redirect('back')
            })
            .catch(next)
    }
    // [GET] /admin/trash
    async trash(req, res, err) {
        let finds = {
            deleted: "true"
        }
        let objectPagination = {
            limitItems: 4,
            currentPage: 1,
            skip: 0,
        }
        let countPage = await Product.countDocuments(finds);
        if (req.query.keyword) {
            countPage = await Product.where({ name: search(req.query) }).countDocuments();
        }
        Product.find(finds).limit(objectPagination.limitItems).skip(objectPagination.skip)
            .then((books) => {
                pagination(objectPagination, finds, req, books.length)
                res.render('admin/product/trash', {
                    title: "product",
                    books: books,
                    keyword: req.query.keyword,
                    pagination: objectPagination
                })
            })
            .catch(err)
    }

}
module.exports = new ProductController()
