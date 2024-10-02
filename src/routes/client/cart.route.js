const express = require('express')
var Router = express.Router()
var CartController = require('../../app/controller/client/CartController')

var cartMiddleware = require('../../midlewares/cart.middleware')
Router.get('/', CartController.index)
Router.post('/add/:id', cartMiddleware.checkCart, CartController.add)

module.exports = Router


