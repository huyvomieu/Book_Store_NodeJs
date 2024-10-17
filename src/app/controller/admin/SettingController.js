const Account = require('../../models/Account.model')
const SettingGenerate = require('../../models/SettingGenerate.model')


class SettingController {
    //[GET] /admin/settings/
    index(req, res, err) {

        res.render('admin/setting/index',
            {
                title: "settings",
                titlePage: "Cài đặt",
            }
        )
    }
    //[PATCH] /admin/settings/update
    async update(req, res, err) {
        req.body.avatar = req.body.image;
        const record = new SettingGenerate(req.body)
        await record.save();
        req.flash("success", "Cập nhật Website thành công!")
        res.redirect("back");
    }
}

module.exports = new SettingController()