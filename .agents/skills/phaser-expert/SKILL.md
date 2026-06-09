---
name: phaser-expert
description: Expert guidance on Phaser 3 best practices, Vite asset loading, Scene management, Arcade Physics, and object pooling. Use when writing or debugging Phaser 3 code.
---

# Phaser 3 Expert Guidance

This skill provides essential patterns and best practices for developing games with Phaser 3 and Vite.

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
