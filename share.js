shareBtn.addEventListener('click', async () => {
            if (navigator.share && currentFile) {
                try {
                    await navigator.share({
                        title: 'Smakosz Lokalny - Polecam!',
                        text: `Musisz spróbować tego dania! Lokalizacja: ${currentLocationLink}`,
                        files: [currentFile] 
                    });
                } catch (err) { console.log("Anulowano"); }
            } else {
                alert("Brak wsparcia dla Share API (wymagany telefon/HTTPS).");
            }
        });