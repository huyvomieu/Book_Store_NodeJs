// const Role = require('../../models/Role.model')
class LoginController {
    // [GET] admin/role
    login(req, res, err) {
        let finds = {
            deleted: false
        }
        res.render("ok")

    }
}

module.exports = new LoginController