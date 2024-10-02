
// edit
const btnChangerProductCategory = document.querySelectorAll('[button-change-product-category]')
if (btnChangerProductCategory) {
    btnChangerProductCategory.forEach(btn => {
        btn.addEventListener("click", (e) => {
            let id = btn.getAttribute('button-change-product-category')
            window.location.href = `/admin/productCategory/edit/${id}`
        })
    })
}
// end edit
// delete product
var buttonDeletes = document.querySelectorAll('[btn-delete-product-category]')
var btnProductCategoryDelete = document.querySelector('#btn-product-category-delete')
if (buttonDeletes) {
    buttonDeletes.forEach((buttonDelete) => {
        buttonDelete.onclick = function () {
            btnProductCategoryDelete.addEventListener('click', (e) => {
                const id = buttonDelete.getAttribute('data-id')
                let formProductCategoryDelete = document.querySelector('#form-product-category-delete')
                console.log(formProductCategoryDelete)
                formProductCategoryDelete.action = `admin/productCategory/delete/${id}?_method=DELETE`;
                formProductCategoryDelete.submit()
            })
        }
    }
    )
}
// end delete product