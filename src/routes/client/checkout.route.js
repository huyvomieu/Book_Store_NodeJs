const express = require('express')
var Router = express.Router()
var CheckoutController = require('../../app/controller/client/CheckoutController')

Router.post('/order', CheckoutController.order)
Router.get('/success/:id', CheckoutController.success)
Router.get('/', CheckoutController.index)


module.exports = Router


