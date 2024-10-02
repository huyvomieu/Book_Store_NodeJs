const ProductController = require('../../app/controller/client/ProductController')
const express = require('express')
const storage = require('../../helpers/uploadFileMulter')
const multer = require('multer');
const fileUpload = multer()

const streamifier = require('streamifier');
const cloudinary = require('cloudinary').v2;

const uploadToCloudinaryMiddleware = require('../../midlewares/uploadToCloudinary')
const checkCookieCart = require('../../midlewares/cart.middleware')
const Router = express.Router()



Router.get('/create', ProductController.create)
Router.get('/edit/:id', ProductController.edit)
Router.patch('/update/:id', fileUpload.single('image'), uploadToCloudinaryMiddleware, ProductController.update)
Router.patch('/restore/:id', ProductController.restore)
Router.delete('/delete/:id', ProductController.delete)
Router.delete('/deleteVV/:id', ProductController.deleteVV)
Router.delete('/deleteMulti', ProductController.deleteMulti)
Router.post('/store', fileUpload.single('image'), uploadToCloudinaryMiddleware, ProductController.store)
Router.get('/:slug', ProductController.detail)

Router.get('/', ProductController.index)

module.exports = Router