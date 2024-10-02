const Account = require('../../Models/Account.model')
const Role = require('../../Models/Role.model')
const md5 = require('md5')

class AccountController {
    // [GET] /admin/account
    async index(req, res, err) {
        const records = await Account.find({ deleted: "false" }).select('-password -token')
        for (const record of records) {
            const role = await Role.findOne({ _id: record.role_id, deleted: false })
            record.role = role
        }
        res.render('admin/account/index',
            {
                title: "accounts",
                titlePage: "Tài khoản",
                records: records,
            }
        )
    }
    // [GET] /admin/account/create
    async create(req, res, err) {
        let roles = await Role.find({}).select('_id name')
        res.render('admin/account/create',
            {
                title: "accounts",
                titlePage: "Tạo mới tài khoản",
                roles: roles
            }
        )
    }
    // [POST] /admin/account/store
    async store(req, res, err) {
        const emailExist = await Account.findOne({ email: req.body.email, deleted: false })
        const userNameExist = await Account.findOne({ username: req.body.username, deleted: false })
        if (emailExist) {
            req.flash("error", "Email đã tồn tại")
            res.redirect('back')
            return
        }
        if (userNameExist) {
            req.flash("error", "Tên đăng nhập đã tồn tại")
            res.redirect('back')
            return
        }
        if (req.body.image) {
            req.body.avatar = req.body.image
            delete req.body.image
        }
        req.body.password = md5(req.body.password)
        const record = await new Account(req.body);
        record.save();
        req.flash("success", "Thêm Tài khoản thành công")
        res.redirect('back');
    }
    // [DELETE] /admin/account/delete/:id
    async delete(req, res, err) {
        Account.findOneAndUpdate({ _id: req.params.id }, { $set: { deleted: true, deletedAt: new Date() } })
            .then(() => {
                req.flash("success", "Xóa Tài khoản thành công")
                res.redirect('back')
            })
            .catch((err) => {
                req.flash("error", "Xóa Tài khoản thất bại")
            })


    }
}
module.exports = new AccountController()