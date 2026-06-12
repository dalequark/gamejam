---
name: phaser-expert
description: Expert guidance on Phaser 3 best practices, Vite asset loading, Scene management, Arcade Physics, and object pooling. Use when writing or debugging Phaser 3 code.
---

# Phaser 3 Expert Guidance

This skill provides essential patterns and best practices for developing games with Phaser 3 and Vite.

Use the folder `game-template`, copying the structure and configuration files, as a starting point for all Phaser 3 projects to ensure compatibility with Vite and Google Cloud Run deployment.

## 1. Vite Asset Imports

When using Phaser 3 with Vite, assets should be imported at the top of the file as ES modules. This ensures Vite bundles them correctly and handles cache-busting.

**Correct:**
```javascript
import logoImg from '../assets/logo.png';
import jumpSound from '../assets/jump.mp3';

export class Preloader extends Phaser.Scene {
    preload() {
        this.load.image('logo', logoImg);
        this.load.audio('jump', jumpSound);
    }
}
```

**Incorrect:**
```javascript
// Do NOT use string paths for bundled assets unless they are in the public/ folder
this.load.image('logo', './assets/logo.png');
```

## 2. Scene Management

Separate game logic into distinct Scene classes. A typical structure includes:
- `Boot`: Minimal setup.
- `Preloader`: Loads all assets and displays a loading bar.
- `MainMenu`: The title screen.
- `Game`: The core gameplay loop.

Always extend `Phaser.Scene` and export the class. 

```javascript
export class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        // Scene setup
    }
}
```

## 3. Arcade Physics

For platformers or top-down games, use Arcade Physics. Ensure physics bodies are properly configured.

**Configuration:**
```javascript
const config = {
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }, // Use 0 for top-down
            debug: false // Set to true to see hitboxes during development
        }
    }
};
```

**Adding Physics Objects:**
```javascript
// Static group for platforms
const platforms = this.physics.add.staticGroup();
platforms.create(400, 568, 'ground').setScale(2).refreshBody();

// Dynamic body for player
const player = this.physics.add.sprite(100, 450, 'dude');
player.setBounce(0.2);
player.setCollideWorldBounds(true);

// Collisions
this.physics.add.collider(player, platforms);
```

## 4. Object Pooling (Groups)

When dealing with many similar objects (bullets, enemies, coins), use Phaser Groups instead of arrays to manage them efficiently and recycle them.

```javascript
const bullets = this.physics.add.group({
    classType: Bullet, // A custom class extending Phaser.Physics.Arcade.Sprite
    maxSize: 30,
    runChildUpdate: true
});

// To fire:
const bullet = bullets.get();
if (bullet) {
    bullet.fire(x, y); // Custom fire method
}
```

## 5. Modern ES6 Syntax

Always use modern JavaScript features:
- `const` and `let` instead of `var`
- Arrow functions where appropriate (`() => {}`)
- Destructuring
- ES6 Classes for Scenes and custom game objects

## 6. Responsive Design & Scaling

To ensure the game fits perfectly on any screen (desktop or mobile) without requiring scrolling, always use `Phaser.Scale.FIT` and center the game canvas.

**Configuration:**
```javascript
const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800, // base design width
        height: 600 // base design height
    },
    // ... physics and other config
};
```

## 7. UI Visibility & Text Contrast

Games often have dark or dynamic backgrounds. To ensure buttons and text are always visible:
- Always give text a high-contrast stroke (e.g., black stroke for white text).
- Or, render a dark semi-transparent rectangle behind UI elements.
- Ensure the UI (text, score, lives, etc) is always rendered with a margin within the view port of the game screen – not flush to the edges.


**Example Text:**
```javascript
this.add.text(10, 10, 'Score: 0', {
    fontSize: '32px',
    color: '#ffffff',
    stroke: '#000000',
    strokeThickness: 4
});
```



## Troubleshooting

The agent will use the following public documentation URLs when necessary to troubleshoot issues.

<a href="https://docs.phaser.io/api-documentation/typedef/phaser">Phaser</a>
<a href="https://docs.phaser.io/api-documentation/typedef/device">Phaser.Device</a>
<a href="https://docs.phaser.io/api-documentation/typedef/physics-matter-events">Phaser.Physics.Matter.Events</a>
<a href="https://docs.phaser.io/api-documentation/typedef/scale">Phaser.Scale</a>
<a href="https://docs.phaser.io/api-documentation/typedef/tilemaps">Phaser.Tilemaps</a>
<a href="https://docs.phaser.io/api-documentation/typedef/tweens">Phaser.Tweens</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-actions">Phaser.Types.Actions</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-animations">Phaser.Types.Animations</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-cameras-controls">Phaser.Types.Cameras.Controls</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-cameras-scene2d">Phaser.Types.Cameras.Scene2D</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-core">Phaser.Types.Core</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-create">Phaser.Types.Create</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-curves">Phaser.Types.Curves</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-display">Phaser.Types.Display</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-gameobjects">Phaser.Types.GameObjects</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-gameobjects-bitmaptext">Phaser.Types.GameObjects.BitmapText</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-gameobjects-container">Phaser.Types.GameObjects.Container</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-gameobjects-graphics">Phaser.Types.GameObjects.Graphics</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-gameobjects-group">Phaser.Types.GameObjects.Group</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-gameobjects-mesh">Phaser.Types.GameObjects.Mesh</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-gameobjects-nineslice">Phaser.Types.GameObjects.NineSlice</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-gameobjects-particles">Phaser.Types.GameObjects.Particles</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-gameobjects-pathfollower">Phaser.Types.GameObjects.PathFollower</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-gameobjects-plane">Phaser.Types.GameObjects.Plane</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-gameobjects-rendertexture">Phaser.Types.GameObjects.RenderTexture</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-gameobjects-rope">Phaser.Types.GameObjects.Rope</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-gameobjects-shader">Phaser.Types.GameObjects.Shader</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-gameobjects-sprite">Phaser.Types.GameObjects.Sprite</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-gameobjects-text">Phaser.Types.GameObjects.Text</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-gameobjects-tilesprite">Phaser.Types.GameObjects.TileSprite</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-gameobjects-video">Phaser.Types.GameObjects.Video</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-gameobjects-zone">Phaser.Types.GameObjects.Zone</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-geom-mesh">Phaser.Types.Geom.Mesh</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-input">Phaser.Types.Input</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-input-gamepad">Phaser.Types.Input.Gamepad</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-input-keyboard">Phaser.Types.Input.Keyboard</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-loader">Phaser.Types.Loader</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-loader-filetypes">Phaser.Types.Loader.FileTypes</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-math">Phaser.Types.Math</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-physics-arcade">Phaser.Types.Physics.Arcade</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-physics-matter">Phaser.Types.Physics.Matter</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-plugins">Phaser.Types.Plugins</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-renderer-snapshot">Phaser.Types.Renderer.Snapshot</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-renderer-webgl">Phaser.Types.Renderer.WebGL</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-scenes">Phaser.Types.Scenes</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-sound">Phaser.Types.Sound</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-textures">Phaser.Types.Textures</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-tilemaps">Phaser.Types.Tilemaps</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-time">Phaser.Types.Time</a>
<a href="https://docs.phaser.io/api-documentation/typedef/types-tweens">Phaser.Types.Tweens</a>
