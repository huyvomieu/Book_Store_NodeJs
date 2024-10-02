// delete product
var buttonDeletes = document.querySelectorAll('[btn-delete-account]')
if (buttonDeletes) {
    var formDeleteAccount = document.querySelector('[form-delete-account]')
    var btnConfirmDeleteAccount = document.querySelector('[btn-account-delete]')
    buttonDeletes.forEach((buttonDelete) => {
        buttonDelete.onclick = function () {
            console.log(buttonDelete.getAttribute('data-id'))
            btnConfirmDeleteAccount.addEventListener('click', (e) => {
                const id = buttonDelete.getAttribute('data-id')
                console.log(formDeleteAccount)
                formDeleteAccount.action = `/admin/account/delete/${id}?_method=DELETE`;
                formDeleteAccount.submit()
            })
        }
    }
    )
}
// end delete product