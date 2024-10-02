const express = require('express')
const app = express()
const ProductCategory = require('../../Models/ProductCategory.model')
const pagination = require('../../../helpers/pagination')

class ProductCategoryController {

    // [GET] admin/productCategory
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
                res.render('admin/product-category/index',
                    {
                        title: "category",
                        records: records,
                        pagination: objectPagination
                    }
                )
            })
            .catch(next)
    }
    // [GET] admin/productCategory/create
    create(req, res, err) {
        ProductCategory.find({})
            .then(records => {
                res.render('admin/product-category/create',
                    {
                        title: "category",
                        records: records
                    }
                )
            })
            .catch(err)
    }
    // [POST] admin/productCategory/store
    async store(req, res, err) {
        req.body.createdBy = {
            account_id: res.locals.user._id
        }
        const record = new ProductCategory(req.body)
        await record.save()
            .then(() => {
                req.flash('success', 'Thêm danh mục thành công');
                res.redirect("back")
            })
            .catch(err)

    }
    // [GET] admin/productCategory/edit/:id
    edit(req, res, err) {
        ProductCategory.findOne({ _id: req.params.id })
            .then(record => {
                res.render('admin/product-category/edit',
                    {
                        title: "category",
                        record: record
                    }
                )
            })
            .catch(err)

    }
    // [PATCH] admin/productCategory/update/:id
    update(req, res, err) {
        req.body.updatedBy = {
            account_id: res.locals.user._id,
            updatedAt: new Date()
        }
        ProductCategory.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(() => {
                req.flash('success', 'Sửa danh mục thành công')
                res.redirect("back")
            })
            .catch(err)

    }
    // [PATCH] admin/productCategory/delete/:id
    delete(req, res, err) {
        let deletedBy = {
            account_id: res.locals.user._id,
            deletedAt: new Date()
        }
        ProductCategory.findOneAndUpdate({ _id: req.params.id }, { $set: { deleted: "true", deletedBy: deletedBy } })
            .then(() => {
                req.flash('success', 'Xóa danh mục thành công')
                res.redirect("back")
            })
            .catch(err)

    }

}
module.exports = new ProductCategoryController()
