const express = require('express')
const app = express()
const Product = require('../../models/Product.model')
const search = require('../../../helpers/search')
const pagination = require('../../../helpers/pagination')
class MeController {

    // [GET] /me/myProduct
    async myProduct(req, res, err) {

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
                res.render('client/me/myProduct', {
                    books: books.slice(0, objectPagination.limitItems),
                    keyword: req.query.keyword,
                    pagination: objectPagination
                })
            })
            .catch(err)
    }
    // [GET] me/trash
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
        await Product.find(finds).limit(objectPagination.limitItems).skip(objectPagination.skip)
            .then((books) => {
                pagination(objectPagination, finds, req, books.length)
                res.render('client/me/myTrash', {
                    books: books,
                    keyword: req.query.keyword,
                    pagination: objectPagination
                })
            })
            .catch(err)
    }

}
module.exports = new MeController()
