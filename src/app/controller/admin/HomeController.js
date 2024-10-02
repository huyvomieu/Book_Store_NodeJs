class HomeController {
    // [GET] /admin/dashboard
    index(req, res, err) {
        res.render('admin/dashboard',
            {
                title: "dashboard",
            }
        )
    }
}

module.exports = new HomeController