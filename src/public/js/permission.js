// begin update permission
var btnUpdatePermisson = document.querySelector('[btn-update-role]')
if (btnUpdatePermisson) {
    btnUpdatePermisson.addEventListener('click', () => {
        let permissions = []
        var table = document.querySelector('#table-update-roles')
        var rows = table.querySelectorAll(`tr[data-name]`)
        rows.forEach(row => {
            let name = row.getAttribute('data-name')
            if (name == "id") {
                var cols = row.querySelectorAll('[data-id]').forEach(col => {
                    permissions.push({
                        id: col.getAttribute('data-id'),
                        permissions: []
                    })
                })
            }
            else {
                var cols = row.querySelectorAll('[data-role]').forEach((col, index) => {
                    if (col.checked) {
                        permissions[index].permissions.push(col.getAttribute('data-role'))
                    }

                })
            }
        })
        var formUpdatePermissions = document.getElementById('form-update-permissions')
        var formInput = formUpdatePermissions.querySelector('input[name= "permissions"')
        formInput.value = JSON.stringify(permissions)
        formUpdatePermissions.submit()
    })
}

// end update permission

// begin default permission
var dataTag = document.querySelector('[data-role-default]')
if (dataTag) {
    var records = JSON.parse(dataTag.getAttribute('data-role-default'))
    var table = document.querySelector('#table-update-roles')

    records.forEach((record, index) => {
        record.permissions.forEach((permission) => {
            let row = table.querySelector(`[data-name="${permission}"]`)
            if (row) {
                let col = row.querySelectorAll('input')[index]
                col.checked = true
            }
        })

    })
}
// end  default permission