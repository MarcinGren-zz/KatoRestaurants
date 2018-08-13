document.querySelectorAll('.rows__listing').forEach(function (elem) {
    elem.addEventListener("click", function () {
        elem.querySelector('a').click()
    })
})