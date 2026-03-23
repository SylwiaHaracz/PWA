const canvas = document.getElementById('canvas');
const retake = document.getElementById('retake');
const photoPreview = document.getElementById('photo-preview');
const shareBtn = document.getElementById('share-btn');
let currentFile;
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
snap.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);

    photoPreview.src = canvas.toDataURL('image/jpeg');
    video.style.display = 'none';
    photoPreview.style.display = 'block';
    snap.style.display = 'none';
    retake.style.display = 'inline-block';
    shareBtn.disabled = false;

    canvas.toBlob((blob) => {
        currentFile = new File([blob], 'daniesmakosza.jpg', {
            type: 'image/jpeg',
        });
    }, 'image/jpeg');
});

retake.addEventListener('click', () => {
    video.style.display = 'block';
    photoPreview.style.display = 'none';
    snap.style.display = 'inline-block';
    retake.style.display = 'none';
    shareBtn.disabled = true;
});
initCamera();

shareBtn.addEventListener('click', async () => {
    if (navigator.share && currentFile) {
        try {
            await navigator.share({
                title: 'Smakosz Lokalny - Polecam!',
                text: `Musisz spróbować tego dania! Lokalizacja: ${currentLocationLink}`,
                files: [currentFile],
            });
        } catch (err) {
            console.log('Anulowano');
        }
    } else {
        alert('Brak wsparcia dla Share API (wymagany telefon/HTTPS).');
    }
});
