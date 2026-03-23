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

var map = null;
var marker = null;

function initMap(lat, lng) {
    if (!map) {
        map = L.map('map').setView([lat, lng], 16);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);
    } else {
        map.setView([lat, lng], 16);
    }
    if (marker) {
        marker.setLatLng([lat, lng]);
    } else {
        marker = L.marker([lat, lng]).addTo(map).bindPopup('<b>Jesteś tutaj!</b>').openPopup();
    }
}

var statusEl = document.getElementById('location-status');

if (!navigator.geolocation) {
    statusEl.textContent = 'Geolokalizacja nie jest obsługiwana przez tę przeglądarkę.';
    statusEl.className = 'text-danger small mb-1';
} else {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            statusEl.textContent = 'Lokalizacja: ' + lat.toFixed(5) + ', ' + lng.toFixed(5);
            statusEl.className = 'text-success small mb-1';
            initMap(lat, lng);
        },
        function (err) {
            statusEl.textContent = 'Błąd GPS: ' + err.message;
            statusEl.className = 'text-danger small mb-1';
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
}