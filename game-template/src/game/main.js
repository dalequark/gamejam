import { Game as MainGame } from './scenes/Game';
import { AUTO, Scale, Game } from 'phaser';
import { CRTPipeline } from './shaders/CRTShader';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,

    width: 1280,
    height: 960,
    parent: 'game-container',
    backgroundColor: '#000000',
    pixelArt: true,
    preserveDrawingBuffer: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },

    input: {
        gamepad: true
    },

    fps: {
        target: 60,
        forceSetTimeOut: true // Bypasses rAF to ensure speed doesn't change on high Hz monitors
    },

    scale: {
        mode: Scale.NONE,
        autoCenter: Scale.CENTER_BOTH
    },
    pipeline: { CRTPipeline },
    scene: [MainGame]
};

const StartGame = (parent) => {
    return new Game({ ...config, parent });
}

export default StartGame;
