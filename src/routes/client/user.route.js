const express = require('express')
const app = express()
const UserController = require('../../app/controller/client/UserController')
const Router = express.Router()

const validate = require('../../validate/user.validate')


Router.get('/login', UserController.login)
Router.get('/register', UserController.register)
Router.post('/register', validate, UserController.registerPost)
module.exports = Router