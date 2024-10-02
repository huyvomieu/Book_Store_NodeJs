const express = require('express')
const app = express()
const ProductCategory = require('../../Models/ProductCategory.model')
const Product = require('../../Models/Product.model')
const pagination = require('../../../helpers/pagination')

class ProductCategoryController {

    // [GET] /productCategory
    async index(req, res, next) {
        let finds = {
            deleted: "false"
        }
        let objectPagination = {
            limitItems: 4,
            currentPage: 1,
            skip: 0,
        }
        let countPage = await ProductCategory.countDocuments(finds);
        if (req.query.page) {
            objectPagination.currentPage = parseInt(req.query.page)
            objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems
        }
        ProductCategory.find(finds).skip(objectPagination.skip).limit(objectPagination.limitItems)
            .then(records => {
                pagination(objectPagination, finds, req, countPage, records.length)
                return records;
            })
            .then((records) => {
                res.render('client/product-category/index',
                    {
                        records: records,
                        pagination: objectPagination
                    }
                )
            })
            .catch(next)
    }

    // [GET] /productCategory/create
    create(req, res, err) {
        ProductCategory.find({})
            .then(records => {
                res.render('client/product-category/create',
                    {
                        records: records
                    }
                )
            })
            .catch(err)
    }

    // [POST] /productCategory/store
    async store(req, res, err) {
        const record = new ProductCategory(req.body)
        await record.save()
            .then(() => {
                req.flash('success', 'Thêm danh mục thành công');
                res.redirect("back")
            })
            .catch(err)

    }
    // [GET] /productCategory/edit/:id
    edit(req, res, err) {
        ProductCategory.findOne({ _id: req.params.id })
            .then(record => {
                res.render('client/product-category/edit',
                    {
                        record: record
                    }
                )
            })
            .catch(err)

    }
    // [GET] /productCategory/:categorySlug
    async details(req, res, err) {
        let category = await ProductCategory.findOne({ slug: req.params.categorySlug })
        const productByCate = await Product.find({ category: category.id })
        res.render('client/product-category/details',
            {
                title: category.name,
                titlePage: category.name,
                products: productByCate
            }
        )
    }
    // [PATCH] /productCategory/update/:id
    update(req, res, err) {
        ProductCategory.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(() => {
                req.flash('success', 'Sửa danh mục thành công')
                res.redirect("back")
            })
            .catch(err)

    }
    // [PATCH] /productCategory/update/:id
    delete(req, res, err) {
        ProductCategory.findOneAndUpdate({ _id: req.params.id }, { $set: { deleted: "true" } })
            .then(() => {
                req.flash('success', 'Xóa danh mục thành công')
                res.redirect("back")
            })
            .catch(err)

    }

}
module.exports = new ProductCategoryController()
