---
description: Deploy your game to Google Cloud.
---

# Deploy to Google Cloud Run

To deploy your Phaser 3 game to Google Cloud Run, follow these steps to package your frontend into a container serving the static assets via an Express server.

## 1. Create a server to serve the game

Create a file named `server.js` in the root of your project:

```javascript
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist')));

app.listen(port, () => {
  console.log(`Game server listening on port ${port}`);
});
```

Make sure to install express:
```bash
npm install express
```

## 2. Dockerize the Application

Create a `Dockerfile` in the root of your project:

```dockerfile
FROM node:20-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "node", "server.js" ]
```

Also, create a `.dockerignore` file to prevent unnecessary files from being copied:

```
node_modules
npm-debug.log
.git
.env
dist
```

## 3. Deploy to Cloud Run

*Note: Ensure you have completed the Qwiklabs Setup and Cloud Run MCP workflow before deploying.*

If your active account is the `workstation-sa` or if you are not authenticated with your student credentials, you need to log in and set your project. Run the following commands (replace `<YOUR_PROJECT_ID>` with your actual Qwiklabs Project ID):

```bash
gcloud auth login
gcloud config set project <YOUR_PROJECT_ID>
```

Run the following command to build and deploy your container to Google Cloud Run. You can replace `my-game` with your desired service name.

```bash
gcloud run deploy my-game --source . --allow-unauthenticated
```

Follow any prompts from the gcloud CLI. Once completed, it will provide you with the public URL where your game is hosted!
