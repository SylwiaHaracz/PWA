const video = document.getElementById('video');
const placeholder = document.getElementById('placeholder-text');
const snap = document.getElementById('snap');

async function initCamera() {
try {
    const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' },
    audio: false,
    });
    video.srcObject = stream;
    placeholder.style.display = 'none';
} catch (err) {
    console.error('Błąd aparatu: ', err);
    placeholder.textContent = 'Brak aparatu (wymaga HTTPS)';
    snap.disabled = true;
}
}
initCamera();