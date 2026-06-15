---
description: Set up your Qwiklabs environment.
---

# Qwiklabs Environment Setup

> **CRITICAL: This setup must be run immediately before you start building your game.**

> **Note for Qwiklabs Users:** In Qwiklabs and restricted sandbox environments, the default workstation service account (`workstation-sa`) cannot make Cloud Run services public due to an organizational policy (`constraints/iam.allowedPolicyMemberDomains`). 

To bypass this and deploy your game publicly later on, you must ensure you are locally authenticated with your allocated Qwiklabs student credentials rather than the default workstation account.

Run this command: 
```bash
gcloud auth login
```

Run the following command to check your active account:
```bash
gcloud auth list
```

If your active account is the `workstation-sa` or if you are not authenticated with your student credentials (your account will start with student), you need to log in and set your project. Run the following commands (replace `<YOUR_PROJECT_ID>` with your actual Qwiklabs Project ID):

```bash
gcloud auth login
gcloud config set project <YOUR_PROJECT_ID>
```

Once `gcloud auth list` confirms your student account is active, your environment is correctly set up for development and deployment.

# MCP Server Setup
Set up the Cloud Run MCP server. Ensure that `~/.gemini/config/mcp_config.json` exists and includes the configuration for the Cloud Run MCP server:
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