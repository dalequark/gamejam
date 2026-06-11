const fs = require('fs');
const { execSync } = require('child_process');
const { GoogleGenAI } = require('@google/genai');

async function generateLyriaAudio(prompt) {
    // Detect the active GCP project from gcloud config
    let projectId;
    try {
        projectId = execSync('gcloud config get-value project', { encoding: 'utf8' }).trim();
    } catch (err) {
        console.error('Failed to detect GCP project via gcloud. Make sure gcloud is installed and configured.');
        process.exit(1);
    }

    if (!projectId) {
        console.error('No active GCP project found. Run: gcloud config set project YOUR_PROJECT_ID');
        process.exit(1);
    }

    // Configure keyless Vertex AI authentication via Application Default Credentials
    process.env.GOOGLE_GENAI_USE_VERTEXAI = 'true';
    process.env.GOOGLE_CLOUD_PROJECT = projectId;
    process.env.GOOGLE_CLOUD_LOCATION = 'global';

    console.log(`Using GCP project: ${projectId}`);
    console.log(`Generating music for prompt: ${prompt}`);

    const client = new GoogleGenAI({
        vertexai: true,
        project: projectId,
        location: 'global'
    });

    try {
        const interaction = await client.interactions.create({
            model: 'lyria-3-clip-preview',
            input: prompt
        });

        // The JS SDK uses camelCase; check both forms for safety
        const audioData = interaction.outputAudio?.data || interaction.output_audio?.data;

        if (!audioData) {
            console.error('Could not find audio data in the response. Full response:', JSON.stringify(interaction, null, 2));
            process.exit(1);
        }

        const buffer = Buffer.from(audioData, 'base64');
        const outputFile = process.argv[3] || 'lyria_output.mp3';

        fs.writeFileSync(outputFile, buffer);
        console.log(`Successfully generated music and saved to ${outputFile}`);
    } catch (error) {
        const errorStr = error.toString() + (error.response?.data ? JSON.stringify(error.response.data) : '');
        
        if (errorStr.includes('invalid_grant') || errorStr.includes('invalid_rapt') || errorStr.includes('reauth')) {
            console.error('\n======================================================================');
            console.error('🔒 [AUTHENTICATION REQUIRED] Google Cloud session has expired or requires Reauth!');
            console.error('Vertex AI (Lyria) requires a fresh Risk Assessment Protection Token (RAPT).');
            console.error('----------------------------------------------------------------------');
            console.error('To resolve this, please run this command in your local terminal:');
            console.error('\n    gcloud auth application-default login');
            console.error('\nThis will open your browser, allow you to sign in, and refresh your token.');
            console.error('======================================================================\n');
        } else {
            console.error('Error generating music:', error);
        }
        process.exit(1);
    }
}

const args = process.argv.slice(2);
if (args.length < 1) {
    console.error('Usage: node generate.js "<prompt>" [output_file.mp3]');
    process.exit(1);
}

const prompt = args[0];
generateLyriaAudio(prompt);
