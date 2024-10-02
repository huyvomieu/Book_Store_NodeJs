const HomeController = require('../../app/controller/admin/HomeController')
const express = require('express')

const Router = express.Router()


Router.get('/', HomeController.index)


module.exports = Router
