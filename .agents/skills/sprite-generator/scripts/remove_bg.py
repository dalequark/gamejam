# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "rembg",
#     "pillow",
#     "onnxruntime"
# ]
# ///
import argparse
import sys
from rembg import remove
from PIL import Image

def main():
    parser = argparse.ArgumentParser(description="Remove background from an image using rembg.")
    parser.add_argument("input", help="Path to the input image file.")
    parser.add_argument("--output", required=True, help="Path to save the output transparent image file.")
    
    args = parser.parse_args()

    try:
        input_image = Image.open(args.input)
        
        # remove() automatically detects the background and makes it transparent
        output_image = remove(input_image)
        
        # Crop the image to the bounding box of the non-transparent pixels
        bbox = output_image.getbbox()
        if bbox:
            output_image = output_image.crop(bbox)
        
        output_image.save(args.output)
        print(f"Success! Background removed and saved to: {args.output}")
        
    except Exception as e:
        print(f"Error removing background: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
