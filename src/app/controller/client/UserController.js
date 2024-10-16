const User = require('../../models/User.model')
const Cart = require('../../models/Cart.model')

const cartMiddleware = require("../../../midlewares/cart.middleware")
const md5 = require('md5')
class UserController {
    // [GET] user/login
    login(req, res, err) {

        res.render('client/user/login', {
            title: "Đăng nhập",
            titlePage: "Đăng nhập tài khoản"
        })

    }
    // [POST] user/login
    async loginPost(req, res, err) {

        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            req.flash('danger', "Email không tồn tại trên hệ thống")
            res.redirect('back')
            return;
        }
        else if (user.password != md5(req.body.password)) {
            req.flash('danger', "Email hoặc mật khẩu không đúng")
            res.redirect('back')
            return;
        }
        const cartUser = await Cart.findOne({ user_id: user.id })
        // Nếu user đã có giỏ hàng thì set lại giỏ hàng và delete giỏ hàng đã có
        if (cartUser) {
            console.log(req.cookies.cartId)
            await Cart.deleteOne({ _id: req.cookies.cartId })
            res.locals.cart = cartUser;
            res.cookie("cartId", cartUser.id);
        }
        // nếu user chưa có thì tìm đến cart đã có thêm id_user vào
        else {
            const cartId = req.cookies.cartId;
            var cart = await Cart.findOneAndUpdate({ _id: cartId }, { user_id: user.id })
            res.cookie("cartId", cart.id);
        }
        req.flash('success', "Đăng nhập thành công!")
        res.cookie("tokenUser", user.tokenUser);
        res.redirect('/')
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
        // Thêm user_id vào cart
        const cartId = req.cookies.cartId;
        await Cart.updateOne({ _id: cartId }, { user_id: user.id })


        req.flash("success", "Tạo tài khoản thành công");
        res.cookie("tokenUser", user.tokenUser);
        res.redirect('/')
    }
    // [GET] user/logout
    async logout(req, res, err) {
        // Khi đăng xuất xóa cookie user và cartId 
        res.clearCookie('tokenUser')
        res.clearCookie('cartId')

        // 
        const cart = new Cart();
        await cart.save();
        let time = 5 * 24 * 60 * 60 * 1000;
        res.cookie('cartId', cart.id, { expires: new Date(Date.now() + time) });
        req.flash("success", "Đăng xuất thành công");
        res.redirect('/')
    }
    // [GET] user/forgotPassword
    forgotPassword(req, res, err) {
        res.render('client/user/forgotPassword',
            {
                title: "Quên mật khẩu",
                titlePage: "Lấy lại mật khẩu",

            }
        )
    }
    // [GET] user/verifyPassword
    verifyPassword(req, res, err) {
        res.render('client/user/verifyPassword',
            {
                title: "Quên mật khẩu",
                titlePage: "Lấy lại mật khẩu",
                email: req.query.email

            }
        )
    }
    // [GET] user/resetPassword
    resetPassword(req, res, err) {
        res.render('client/user/resetPassword',
            {
                title: "Đổi mật khẩu",
                titlePage: "Đặt lại mật khẩu",
                email: req.query.email
            }
        )
    }
    // [POST] user/resetPassword
    async resetPasswordPost(req, res, err) {
        try {
            const password = md5(req.body.password);
            const tokenUser = req.cookies.tokenUser;
            if (tokenUser) {
                await User.updateOne({ tokenUser: tokenUser }, { password: password })
            }
            req.flash("success", "Đổi mật khẩu thành công");
            res.redirect("/")
        } catch (error) {
            console.error('Lỗi hệ thống:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }
}

module.exports = new UserController()