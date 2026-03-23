window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('installBtn').classList.remove('d-none');
});

document.getElementById('installBtn').addEventListener('click', function () {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function () {
        deferredPrompt = null;
        document.getElementById('installBtn').classList.add('d-none');
    });
});