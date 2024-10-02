// update product

var buttonChangerProduct = document.querySelectorAll('[btn-change-product]')
if (buttonChangerProduct) {
    buttonChangerProduct.forEach(btnChanger => {
        btnChanger.addEventListener("click", (event) => {
            event.preventDefault()
            let ProductId = btnChanger.getAttribute('button-change')
            console.log(ProductId)
            let formBtnEdit = document.getElementById('form-product-edit')
            formBtnEdit.action = `/admin/product/edit/${ProductId}`
            console.log(formBtnEdit.action)
            formBtnEdit.submit()
        })
    })
}

// end update product


