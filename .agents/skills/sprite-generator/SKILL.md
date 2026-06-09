---
name: sprite-generator
description: >-
  Generates sprite images and automatically removes their background to produce true transparent PNGs. Use when the user asks to generate a game asset, character sprite, or platform image without a solid or checkerboard background.
---

# Sprite Generator

## Overview
Generates sprites with true transparency. This skill combines the innate `generate_image` tool to produce an initial sprite, and a Python script using `rembg` to strip away any fake or solid backgrounds produced by the AI.

## Dependencies
- `generate_image` tool
- `uv` (for executing the Python script)

## Workflow

### 1. Generate the Raw Image
Use your `generate_image` tool to create the requested sprite.
- Request a solid background (e.g., "solid white background") in your prompt to make it easier for `rembg` to cut out the subject. Do not request a transparent background in the prompt because AI models often generate literal checkerboard patterns instead.
- Save the result to the workspace (e.g., `raw_sprite.png`).

### 2. Remove the Background
Run the helper Python script using `uv run` to remove the background from the raw image and produce the final transparent PNG.

```bash
uv run scripts/remove_bg.py raw_sprite.png --output final_sprite.png
```

### 3. Cleanup
If the user wants the final sprite in a specific folder (like `public/assets/`), move the `final_sprite.png` to that location and delete the `raw_sprite.png`.

## Common Mistakes
- **Forgetting `--output`**: The script requires the `--output` flag for the destination file.
- **Putting the script in the wrong path**: Make sure you run the script from the directory containing `scripts/remove_bg.py` or use an absolute path to the script.
