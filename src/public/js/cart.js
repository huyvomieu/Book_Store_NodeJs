// begin change quantity cart
var inputsQuantity = document.querySelectorAll('[input-change-quantity]')
if (inputsQuantity.length > 0) {
    inputsQuantity.forEach(input => {
        input.addEventListener('change', (e) => {
            let productId = input.getAttribute('data-id');
            let quantity = input.value;
            if (quantity == 0) {
                window.location.href = `/cart/delete/${productId}`
            }
            else {
                window.location.href = `/cart/update/${productId}/${quantity}`
            }

        })
    });
}
// end change quantity cart