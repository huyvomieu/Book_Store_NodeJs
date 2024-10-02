const express = require('express')
const app = express()
const LoginController = require('../../app/controller/client/LoginController')
const Router = express.Router()



Router.get('/login', LoginController.login)
Router.get('/register', LoginController.register)
Router.get('/:slug', LoginController.login)
module.exports = Router