const express = require('express')
var Router = express.Router()
var homeController = require('../../app/controller/client/HomeController')
Router.get('/', homeController.index)

module.exports = Router


