const Role = require('../../Models/Role.model')
class RoleController {
    // [GET] admin/role
    index(req, res, err) {
        let finds = {
            deleted: false
        }
        Role.find(finds)
            .then((roles) => {
                res.render('admin/role/index',
                    {
                        title: "role",
                        titlePage: "Danh sách Nhóm quyền",
                        roles: roles
                    }
                )
            })
            .catch(err)

    }
    // [GET] admin/role/create
    create(req, res, err) {
        res.render('admin/role/create',
            {
                title: "role",
                titlePage: "Tạo mới Nhóm quyền",
            }
        )
    }
    // [POST] admin/role/store
    store(req, res, err) {
        const record = new Role(req.body)
        record.save()
            .then(() => {
                req.flash('success', "Thêm Nhóm quyền thành công!")
                res.redirect('back')
            })
            .catch(err)
    }
    // [GET] admin/role/permissions
    permissions(req, res, err) {
        let permiss = [
            {
                id: "view",
                name: "Xem"
            },
            {
                id: "add",
                name: "Thêm mới"
            },
            {
                id: "update",
                name: "Cập nhật"
            },
            {
                id: "delete",
                name: "Xóa"
            },

        ];
        Role.find({ deleted: false })
            .then((records => {
                res.render('admin/role/permission',
                    {
                        title: "permissions",
                        titlePage: "Phân quyền",
                        records: records,
                        permiss: permiss,
                        countRole: records.length
                    }
                )
            }))
            .catch(err)

    }
    // [PATCH] admin/role/storePermissions
    async storePermissions(req, res, err) {
        var permissionsObject = JSON.parse(req.body.permissions)
        for (let record of permissionsObject) {
            await Role.findOneAndUpdate({ _id: record.id }, { permissions: record.permissions })
        }
        req.flash('success', "Cập nhật phân quyền thành công!")

        res.redirect('back')

    }
}

module.exports = new RoleController