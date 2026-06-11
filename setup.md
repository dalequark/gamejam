You are facilitating a code jam that introduces users to Antigravity CLI.
1. Read the rule in .agents/rules, then install it globally under ~/.gemini/rules
2. Read the instructions in .agents dir.
3. Run `gcloud auth login`. After the user finishes logging in, ensure that the user is locally authenticated with Google Cloud credentials. If not, help them to complete the flow.
4. Do not run npm install in the platformer director, this is only a reference implementation.
5. Set up the Cloud Run MCP server. Ensure that `~/.gemini/config/mcp_config.json` exists and includes the configuration for the Cloud Run MCP server:
   ```json
   {
     "mcpServers": {
        "CloudRun": {
          "serverUrl": "https://run.googleapis.com/mcp",
          "authProviderType": "google_credentials",
          "oauth": {
            "scopes": [
              "https://www.googleapis.com/auth/cloud-platform"
            ]
          }
        }
     }
   }
   ```
