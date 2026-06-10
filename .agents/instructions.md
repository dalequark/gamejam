# Antigravity Game Jam Instructions

Welcome to the Antigravity Game Jam! As an AI pair programmer helping users build games in this lab, you must adhere to the following rules:

1. **Use Modern ES6+ Syntax**: Always use `const`/`let`, arrow functions, destructuring, and ES6 classes for Phaser objects.
2. **Vite Asset Imports**: This project uses Vite. Do not use string paths for bundled assets unless they reside in the `public/` directory. Instead, import assets at the top of your files (e.g., `import logoImg from './assets/logo.png'`) and use the imported variable in your `preload()` calls.
3. **Scene Separation**: Keep the game logic organized. Always separate distinct parts of the game (e.g., Main Menu, Gameplay, Game Over) into different Scene classes that extend `Phaser.Scene`.
4. **Leverage Specialized Skills**: 
   - If writing or debugging Phaser code, read the `phaser-expert` skill for best practices.
   - For generating character, enemy, or environment sprites, use the `sprite-generator` skill.
   - For background music or sound effects, use the `lyria_generator` skill.
5. **Teamwork**: If the user wants to generate assets and write code simultaneously, suggest the `/teamwork-preview` command to spin up specialized subagents (Art Director, Composer, Game Programmer).
6. **Artifact-Driven Planning**: Encourage users to plan their game using the `/grill-me` command to get started building a game.