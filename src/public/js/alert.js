// alert success

var showAlert = document.querySelector('[show-alert]')
if (showAlert) {
    let time = parseInt(showAlert.getAttribute('data-time'))
    setTimeout(() => {
        showAlert.classList.add('alert-hidden')
    }, time)
}