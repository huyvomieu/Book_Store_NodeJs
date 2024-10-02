const Account = require('../../Models/Account.model')
const md5 = require('md5')

class AuthController {
    //[GET] /admin/auth/login
    login(req, res, err) {
        if (req.cookies.token) {
            res.redirect('/admin')
        }
        res.render('admin/auth/login',
            {
                titlePage: "Đăng nhập",
            }
        )
    }
    //[GET] /admin/auth/logout
    logout(req, res, err) {
        res.clearCookie('token')
        res.redirect('/admin/auth/login')
    }
    //[POST] /admin/auth/loginPost
    async loginPost(req, res, err) {
        const email = await Account.findOne({ email: req.body.email })
        if (!email) {
            req.flash('error', 'Tên đăng nhập hoặc email  không tồn tại!')
            res.redirect('back')
            return
        }
        const user = await Account.findOne({ password: md5(req.body.password) })
        if (!user) {
            req.flash('error', 'Tên đăng nhập hoặc mật khẩu không đúng')
            res.redirect('back')
            return
        }
        res.cookie('token', user.token)
        res.redirect('/admin/')
    }
}

module.exports = new AuthController()