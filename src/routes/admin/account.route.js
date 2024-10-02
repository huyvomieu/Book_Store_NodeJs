const AccountController = require('../../app/controller/admin/AccountController')
const express = require('express')
const Router = express.Router()

const multer = require('multer');
const fileUpload = multer()

const uploadToCloudinary = require('../../midlewares/uploadToCloudinary')

Router.get('/', AccountController.index)
Router.get('/create', AccountController.create)
Router.delete('/delete/:id', AccountController.delete)
Router.post('/store', fileUpload.single('avatar'), uploadToCloudinary, AccountController.store)


module.exports = Router
