const User = require('../../models/User.model')

const md5 = require('md5')
class UserController {
    // [GET] user/login
    login(req, res, err) {

        res.render('client/user/login', {
            title: "Đăng nhập",
            titlePage: "Đăng nhập tài khoản"
        })

    }
    // [GET] user/register
    register(req, res, err) {

        res.render('client/user/register',
            {
                title: "Đăng Kí",
                titlePage: "Đăng kí tài khoản"
            }
        )

    }
    // [POST] user/registerPost
    async registerPost(req, res, err) {
        const email = req.body.email
        const existEmail = await User.findOne({ email: email })
        if (existEmail) {
            req.flash('danger', "Email đã tồn tại trên hệ thống")
            res.redirect('back')
            return;
        }
        if (req.body.password != req.body.repassword) {
            req.flash('danger', "Mật khẩu không khớp")
            res.redirect('back')
            return;
        }
        req.body.fullname = req.body.firstname + " " + req.body.lastname
        req.body.password = md5(req.body.password)
        const user = new User(req.body)
        user.save();

        res.redirect('/')
    }
}

module.exports = new UserController()