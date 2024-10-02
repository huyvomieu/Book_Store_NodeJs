const ProductController = require('../../app/controller/admin/ProductController')
const express = require('express')
const Router = express.Router()


const multer = require('multer');
const fileUpload = multer()

const uploadToCloudinary = require('../../midlewares/uploadToCloudinary')



Router.get('/create', ProductController.create)
Router.get('/edit/:id', ProductController.edit)
Router.get('/trash', ProductController.trash)
Router.patch('/update/:id', fileUpload.single('image'), uploadToCloudinary, ProductController.update)
Router.patch('/restore/:id', ProductController.restore)
Router.delete('/delete/:id', ProductController.delete)
Router.delete('/deleteVV/:id', ProductController.deleteVV)
Router.delete('/deleteMulti', ProductController.deleteMulti)
Router.post('/store', fileUpload.single('image'), uploadToCloudinary, ProductController.store)
Router.get('/', ProductController.index)

module.exports = Router