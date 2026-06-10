const fs = require('fs');
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

async function generateLyriaAudio(prompt) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
        console.error('Please set a valid GEMINI_API_KEY in your .env file.');
        process.exit(1);
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });

    console.log(`Generating music for prompt: ${prompt}`);

    try {
        const interaction = await ai.interactions.create({
            model: 'lyria-3-clip-preview',
            input: prompt
        });

        // The JS SDK usually uses camelCase for properties, but check both just in case
        const audioData = interaction.outputAudio?.data || interaction.output_audio?.data;
        
        if (!audioData) {
            console.error("Could not find audio data in the response. Full response:", JSON.stringify(interaction, null, 2));
            process.exit(1);
        }

        const buffer = Buffer.from(audioData, 'base64');
        const outputFile = process.argv[3] || 'lyria_output.mp3';
        
        fs.writeFileSync(outputFile, buffer);
        console.log(`Successfully generated music and saved to ${outputFile}`);
    } catch (error) {
        console.error(`Error generating music:`, error);
    }
}

const args = process.argv.slice(2);
if (args.length < 1) {
    console.error('Usage: node generate.js "<prompt>"');
    process.exit(1);
}

const prompt = args[0];
generateLyriaAudio(prompt);
