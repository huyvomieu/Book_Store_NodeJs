const ProductCategoryController = require('../../app/controller/admin/ProductCategoryController')
const express = require('express')
const Router = express.Router()

const storage = require('../../helpers/uploadFileMulter')
const multer = require('multer');
const fileUpload = multer()
const streamifier = require('streamifier');
const cloudinary = require('cloudinary').v2;

const uploadToCloudinary = require('../../midlewares/uploadToCloudinary')



Router.get('/create', ProductCategoryController.create)
Router.get('/edit/:id', ProductCategoryController.edit)
Router.delete('/delete/:id', ProductCategoryController.delete)
Router.patch('/update/:id', fileUpload.single('image'), uploadToCloudinary, ProductCategoryController.update)
Router.post('/store', fileUpload.single('image'), uploadToCloudinary, ProductCategoryController.store)
Router.get('/', ProductCategoryController.index)

module.exports = Router