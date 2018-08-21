document.querySelectorAll('.restaurant__image-figure img').forEach(function(elem) {
    elem.addEventListener('click', function() {
        elem.classList.toggle('restaurant__image-focus')
    })
})