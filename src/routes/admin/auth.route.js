const AuthController = require('../../app/controller/admin/AuthController')
const express = require('express')
const Router = express.Router()

Router.get('/login', AuthController.login)
Router.get('/logout', AuthController.logout)
Router.post('/loginPost', AuthController.loginPost)

module.exports = Router
