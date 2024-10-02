
class LoginController {
    // [GET] auth/login
    login(req, res, err) {

        res.render('client/login/login')

    }
    // [GET] auth/register
    register(req, res, err) {

        res.render('client/login/register')

    }
}

module.exports = new LoginController