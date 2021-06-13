window.onload = function () {
    setTimeout(addLoaded, 3000);
}

function addLoaded() {
    const spinner = document.getElementById('loading');
    spinner.classList.add('loaded');
}

window.onpageshow = function (event) {
    if (event.persisted) {
        window.location.reload();
    }
};
