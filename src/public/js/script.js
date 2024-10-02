// begin title
var titlePage = document.querySelector('title[data-title]')
if (titlePage) {
    let value = titlePage.getAttribute('data-title')
    let pageLink = document.querySelectorAll(`li.nav-item a`)
    pageLink.forEach(page => {
        // console.log(page.hasAttribute(`${value}`))
        if (page.hasAttribute(`${value}`)) {
            // console.log(page)
            page.classList.add('active')
        }
        else {
            page.classList.remove('active')
        }
    })
}

// search
var btnSearch = document.querySelector("#btn-search")
if (btnSearch) {
    btnSearch.addEventListener("click", (e) => {
        e.preventDefault()
        let value = document.querySelector("#input-search").value;
        let url = new URL('http://localhost:3000/me/myProduct')
        if (value) {
            url.searchParams.set("keyword", value)
        } else {
            url.searchParams.delete("keyword")
        }
        window.location.href = url.href
    })
}

// end search


// fitler (bộ lọc)
var Filler = document.querySelector("[filter]")
if (Filler) {
    Filler.addEventListener("change", (e) => {
        let url = new URL(window.location.href)
        console.log(e.target.value)
        if (e.target.value) {
            url.searchParams.set('university', e.target.value)
        } else {
            url.searchParams.delete('university')
        }
        window.location.href = url.href
    })
}
// end fitler (bộ lọc)
// begin sort
var sortSelect = document.querySelector('[sort]')
if (sortSelect) {
    let url = new URL(window.location.href)
    var valueS = ""
    sortSelect.addEventListener("change", (e) => {
        valueS = e.target.value
        const [sortKey, sortValue] = valueS.split('-')
        url.searchParams.set('sortKey', sortKey)
        url.searchParams.set('sortValue', sortValue)
        window.location.href = url.href
    })

    // clear sort
    const btnDeleteOption = document.querySelector('[btn-delete-option]')
    if (btnDeleteOption) {
        btnDeleteOption.addEventListener('click', (e) => {
            let url = new URL(window.location.href)
            url.searchParams.delete('sortKey')
            url.searchParams.delete('sortValue')
            window.location.href = url.href
        })
    }

    // Add attr selected to option
    const sortKey = url.searchParams.get('sortKey')
    const sortValue = url.searchParams.get('sortValue')
    let sortOption = sortSelect.querySelector(`option[value="${sortKey}-${sortValue}"]`)
    if (sortOption) {
        sortOption.selected = true
    }
}

// end  sort



// pagination

var btnPages = document.querySelectorAll('[button-pagination]')
if (btnPages) {
    btnPages.forEach(btnPage => {
        let url = new URL(window.location.href)

        btnPage.addEventListener("click", (e) => {
            let totalPage = parseInt(btnPage.getAttribute('total-page'))
            let previousPage = parseInt(btnPage.getAttribute('button-pagination'))
            e.preventDefault()
            if (previousPage > 0 && previousPage <= totalPage) {
                console.log(previousPage)
                url.searchParams.set("page", previousPage)
                window.location.href = url.href
            }
        })
    })
}

// end pagination

// update product

var buttonChangerProduct = document.querySelectorAll('#btn-change-product')
if (buttonChangerProduct) {
    buttonChangerProduct.forEach(btnChanger => {
        btnChanger.addEventListener("click", (event) => {
            event.preventDefault()
            let ProductId = btnChanger.getAttribute('button-change')
            console.log(ProductId)
            let formBtnEdit = document.getElementById('form-product-edit')
            formBtnEdit.action = `/product/edit/${ProductId}`
            console.log(formBtnEdit.action)
            formBtnEdit.submit()
        })
    })
}

// end update product

// select-all
var checkboxSelectAll = document.querySelector("[select-all]")
var checkboxIds = document.querySelectorAll('[select-id]')
if (checkboxSelectAll) {
    checkboxSelectAll.addEventListener('click', (e) => {

        checkboxIds.forEach(checkboxId => {
            checkboxId.checked = checkboxSelectAll.checked
        })
        var btnDeleteMultiDisplay = document.querySelector('[btn-delete-multi-product]')

        btnDeleteMultiDisplay.style.display = (checkboxSelectAll.checked) ? "block" : "none"

    })
}

// end select-all
checkboxIds.forEach(checkboxId => {
    checkboxId.onclick = function () {
        let checkedCount = 0;
        checkboxIds.forEach(checkboxId => {
            if (checkboxId.checked)
                checkedCount++
        })
        checkboxSelectAll.checked = (checkedCount == checkboxIds.length)
        if (checkedCount > 0 || checkboxSelectAll.checked == true) {
            btnDeleteMultiDisplay.style.display = "block"
        }
        else {
            btnDeleteMultiDisplay.style.display = "none"

        }
    }
})

// select-multi


// end select-multi

// delete product
var buttonDeletes = document.querySelectorAll('[delete-product]')
var formProductDelete = document.querySelector('#form-product-delete')
var btnProductDelete = document.querySelector('#btn-product-delete')
if (buttonDeletes) {
    buttonDeletes.forEach((buttonDelete) => {
        buttonDelete.onclick = function () {
            console.log(buttonDelete.getAttribute('data-id'))
            btnProductDelete.addEventListener('click', (e) => {
                const id = buttonDelete.getAttribute('data-id')
                let formProductDelete = document.querySelector('#form-product-delete')

                console.log(formProductDelete)
                formProductDelete.action = `/admin/product/delete/${id}?_method=DELETE`;
                formProductDelete.submit()
            })
        }
    }
    )
}
// end delete product
// delete multi
var btnDeleteMulti = document.querySelector('[btn-delete-multi]')
if (btnDeleteMulti) {
    btnDeleteMulti.addEventListener("click", (e) => {
        e.preventDefault()
        const ids = []
        const checkboxIdChecked = document.querySelectorAll("[select-id]:checked")
        const inputDeleteMulti = document.querySelector("[inputDeleteMulti]")
        const formDeleteMulti = document.querySelector('#delete-multi')
        const btnDeleteProductMulti = document.querySelector('#btn-product-deleteMulti')
        checkboxIdChecked.forEach(bookId => {
            ids.push(bookId.id)
        })
        inputDeleteMulti.value = ids.slice().join(",")
        console.log(formDeleteMulti)
        btnDeleteProductMulti.onclick = function () {
            formDeleteMulti.submit()
        }
    })
}

//  end delete multi

// delete product permanently (xóa vĩnh viễn sản phẩm)
var buttonDeletePermanently = document.querySelectorAll('#btn-product-delete-permanently')
var formProductDeletePerman = document.querySelector('#form-product-delete-permanently')
var btnconfirmDelete = document.querySelector('#btn-confirm-delete-permanently')
if (buttonDeletePermanently) {
    buttonDeletePermanently.forEach((buttonDelete) => {
        buttonDelete.onclick = function () {
            console.log(buttonDelete.getAttribute('data-id'))

            btnconfirmDelete.addEventListener('click', (e) => {
                const id = buttonDelete.getAttribute('data-id')
                formProductDeletePerman.action = `/product/deleteVV/${id}?_method=DELETE`;
                formProductDeletePerman.submit()
            })
        }
    }
    )
}

// end delete product permantly

// restore product

var buttonRestoreProduct = document.querySelectorAll('#btn-restore-product')
if (buttonRestoreProduct) {
    buttonRestoreProduct.forEach(btnRestore => {
        btnRestore.addEventListener("click", (e) => {
            e.preventDefault()
            let ProductId = btnRestore.getAttribute('button-restore')
            console.log(ProductId)
            let formBtnRestore = document.getElementById('formRestore')
            formBtnRestore.action = `/product/restore/${ProductId}?_method=PATCH`
            formBtnRestore.submit()
        })
    })
}
// end restore product

// show image
var uploadImage = document.querySelector('[upload-image]')
if (uploadImage) {
    const fileImage = uploadImage.querySelector('[upload-image-input]')
    const showImg = uploadImage.querySelector('[upload-image-preview]')
    fileImage.onchange = event => {
        // const [file] = fileImage.files
        const file = event.target.files[0];
        if (file) {
            showImg.setAttribute('width', '50px')
            showImg.setAttribute('height', '50px')
            showImg.src = URL.createObjectURL(file)
        }

    }
}

// end show image

// begin add product on cart


// end add product on cart 
