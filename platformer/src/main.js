import StartGame from './game/main';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Booting game...');
    StartGame('game-container');
});

// Listen for screenshot requests from the parent window (for moderation)
window.addEventListener('message', (event) => {
    if (event.data && event.data.action === 'CAPTURE_SCREENSHOT') {
        const canvas = document.querySelector('canvas');
        if (canvas) {
            const dataURL = canvas.toDataURL('image/png');
            window.parent.postMessage({
                action: 'SCREENSHOT_DATA',
                data: dataURL
            }, '*');
        }
    }
});
