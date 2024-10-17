class HomeController {
    // [GET] /admin/dashboard
    index(req, res, err) {
        res.render('admin/dashboard',
            {
                title: "dashboard",
                titlePage: "Tổng quan",
            }
        )
    }
}

module.exports = new HomeController