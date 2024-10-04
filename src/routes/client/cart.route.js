const express = require('express')
var Router = express.Router()
var CartController = require('../../app/controller/client/CartController')

var cartMiddleware = require('../../midlewares/cart.middleware')
Router.post('/add/:id', CartController.add)
Router.get('/', CartController.index)
Router.get('/delete/:productId', CartController.delete)
Router.get('/update/:productId/:quantity', CartController.update)

module.exports = Router


