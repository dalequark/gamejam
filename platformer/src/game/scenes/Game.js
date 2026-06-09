import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    preload ()
    {
        this.load.setPath('assets');
        this.load.image('player', 'player_hero.png');
    }

    create ()
    {
        // Add a simple sky background color
        this.cameras.main.setBackgroundColor('#87CEEB');

        // Generate a simple green rectangle for the platforms
        const platformGraphics = this.add.graphics();
        platformGraphics.fillStyle(0x228b22, 1);
        platformGraphics.fillRect(0, 0, 128, 32);
        platformGraphics.generateTexture('platform_tex', 128, 32);
        platformGraphics.destroy();

        // Create a static physics group for the platforms
        this.platforms = this.physics.add.staticGroup();

        // Create the ground
        // We place it at the bottom center and scale it horizontally to fill the screen
        this.platforms.create(640, 944, 'platform_tex').setScale(10, 1).refreshBody();

        // Add some floating ledges
        this.platforms.create(900, 700, 'platform_tex').setScale(2, 1).refreshBody();
        this.platforms.create(200, 500, 'platform_tex').setScale(2, 1).refreshBody();
        this.platforms.create(1000, 300, 'platform_tex').setScale(2, 1).refreshBody();

        // Create the player
        this.player = this.physics.add.sprite(100, 450, 'player').setScale(0.2);

        // Player physics properties: slight bounce, and don't fall off the world
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);

        // Add collision between player and platforms
        this.physics.add.collider(this.player, this.platforms);

        // Setup input controls for the player
        this.cursors = this.input.keyboard.createCursorKeys();

        // Simple instructional text
        this.add.text(16, 16, 'Platformer Template', { fontSize: '32px', fill: '#000', fontFamily: 'Arial' });
        this.add.text(16, 56, 'Use Arrow Keys to Move and Jump', { fontSize: '24px', fill: '#000', fontFamily: 'Arial' });
    }

    update ()
    {
        // Stop any previous horizontal movement
        this.player.setVelocityX(0);

        // Left / Right movement
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-400);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(400);
        }

        // Jump (only allowed if touching a surface below)
        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-700);
        }
    }
}
