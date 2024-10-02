const express = require('express')
var Router = express.Router()
var searchController = require('../../app/controller/client/SearchController')
Router.get('/', searchController.index)

module.exports = Router


