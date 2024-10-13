const express = require('express')
const app = express()
const Product = require('../../models/Product.model')
const ProductCategory = require('../../models/ProductCategory.model')
class ProductController {

    // [GET] /product/
    async index(req, res, next) {
        let finds = {
            deleted: false
        }
        const products = await Product.find(finds)
        res.render('client/product/index', { product: products })
    }
    // [GET] /product/:slug
    async detail(req, res, next) {
        let finds = {
            slug: req.params.slug,
        }
        const product = await Product.findOne(finds)
        const category = await ProductCategory.findOne({ deleted: false, _id: product.category })
        res.render('client/product/details', {
            title: product.name,
            product: product,
            category: category

        })
    }

    // [GET] /product/create
    create(req, res, next) {
        res.render('client/product/create')
    }

    // [POST] /product/store
    async store(req, res, err) {
        const product = new Product(req.body)
        await product.save()
            .then(() => {
                req.flash('success', 'Thêm sản phẩm thành công');
                res.redirect("back")
            })
            .catch(err)

    }

    // [GET] /product/edit/:id
    edit(req, res, next) {
        Product.findOne({ _id: req.params.id })
            .then((book) => {
                res.render('client/product/edit', { book: book })
            }).
            catch(next)
    }
    // [PATCH] /product/update/:id
    update(req, res, next) {
        req.body.updatedAt = new Date();
        Product.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(() => {
                req.flash('success', 'Lưu thành công');
                res.redirect('back')
            })
            .catch(next)
    }
    // [PATCH] /product/restore/:id
    restore(req, res, next) {
        Product.findOneAndUpdate({ _id: req.params.id }, { deleted: false })
            .then(() => {
                req.flash('success', 'Khôi phục thành công');
                res.redirect('back')
            })
            .catch(next)
    }
    // [DELETE] /product/delete/:id
    delete(req, res, next) {
        Product.findByIdAndUpdate({ _id: req.params.id }, { $set: { deleted: true, deletedAt: new Date() } })
            .then(() => {
                req.flash('success', 'Xóa sản phẩm thành công');
                res.redirect('back')
            })
            .catch(next)
    }
    // [DELETE] /product/deleteVV/:id
    deleteVV(req, res, next) {
        Product.findByIdAndDelete({ _id: req.params.id })
            .then(() => {
                req.flash('success', 'Xóa sản phẩm thành công');
                res.redirect('back')
            })
            .catch(next)
    }
    // [DELETE] /product/deleteMulti
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

}
module.exports = new ProductController()
