const express = require('express')
var Router = express.Router()
var OtpController = require('../../app/controller/client/OtpController')

const validate = require('../../validate/user.validate')


Router.post('/sendOTP', OtpController.sendOTP);
Router.post('/verifyOTP', OtpController.verifyOTP);

module.exports = Router


