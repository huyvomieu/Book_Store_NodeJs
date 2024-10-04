const Account = require('../app/models/Account.model')
const Role = require('../app/models/Role.model')

module.exports.requireAuth = async (req, res, next) => {
    if (!req.cookies.token) {
        res.redirect('/admin/auth/login')
        return
    }
    const user = await Account.findOne({ token: req.cookies.token }).select('-token -password')
    if (!user) {
        res.redirect('/admin/auth/login')
        return
    }
    const role = await Role.findOne({ _id: user.role_id })
    res.locals.role = role
    res.locals.user = user
    next()
}