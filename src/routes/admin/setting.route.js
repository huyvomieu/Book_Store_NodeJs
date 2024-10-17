const SettingController = require('../../app/controller/admin/SettingController')
const express = require('express')

const Router = express.Router()

const multer = require('multer');
const fileUpload = multer()


const uploadToCloudinary = require('../../midlewares/uploadToCloudinary')

Router.get('/', SettingController.index)
Router.post('/update', fileUpload.single("avatar"), uploadToCloudinary, SettingController.update)



module.exports = Router
