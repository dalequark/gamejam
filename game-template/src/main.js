import StartGame from './game/main';

document.addEventListener('DOMContentLoaded', () => {

    // Wait for the retro font to load before booting the game to avoid fallback fonts
    document.fonts.load('10px "Press Start 2P"').then(() => {
        StartGame('game-container');
    }).catch(err => {
        console.error('Font failed to load:', err);
        StartGame('game-container'); // Fallback
    });

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
