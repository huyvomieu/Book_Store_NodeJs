const express = require('express')
const app = express()
const UserController = require('../../app/controller/client/UserController')
const Router = express.Router()

const validate = require('../../validate/user.validate')


Router.get('/login', UserController.login)
Router.get('/register', UserController.register)
Router.post('/register', validate, UserController.registerPost)
Router.post('/login', UserController.loginPost)
Router.get('/logout', UserController.logout)
Router.get('/forgotPassword', UserController.forgotPassword)
Router.get('/verifyPassword', UserController.verifyPassword)
Router.get('/resetPassword', UserController.resetPassword)
Router.post('/resetPassword', validate.resetPassword, UserController.resetPasswordPost)
module.exports = Router