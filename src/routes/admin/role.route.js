const RoleController = require('../../app/controller/admin/RoleController')
const express = require('express')

const Router = express.Router()


Router.get('/create', RoleController.create)
Router.get('/permissions', RoleController.permissions)
Router.patch('/storePermissions', RoleController.storePermissions)
Router.post('/store', RoleController.store)
Router.get('/', RoleController.index)


module.exports = Router
