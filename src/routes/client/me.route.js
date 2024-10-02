const MeController = require('../../app/controller/client/MeController')

const express = require('express')
var Router = express.Router()


Router.get('/myProduct', MeController.myProduct)
Router.get('/trash', MeController.trash)

module.exports = Router