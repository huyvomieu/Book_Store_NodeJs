module.exports = (req, res, next) => {
    if (!req.body.fisrtname && !req.body.lastname) {
        req.flash('danger', "Vui lòng nhập họ tên!")
        res.redirect('back')
        return;
    }
    if (!req.body.email) {
        req.flash('danger', "Vui lòng nhập email!")
        res.redirect('back')
        return;
    }
    if (!req.body.password && !req.body.repassword) {
        req.flash('danger', "Vui lòng nhập mật khẩu!")
        res.redirect('back')
        return;
    }
    next()
}