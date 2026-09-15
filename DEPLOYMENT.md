# 🚀 Dallas Trip Itinerary — Deployment Guide & Publishing Mechanism

This repository is deployed to **Azure Static Web Apps (Free Tier)** with an integrated **Azure Functions Node.js v4** managed backend and **Turso Cloud SQLite** persistent storage.

- **Resource Name:** `dallas-trip-itinerary`
- **Resource Group:** `sandbox`
- **Region:** `eastus2`
- **GitHub Repository:** [https://github.com/eduardo92/dallas-trip-itinerary](https://github.com/eduardo92/dallas-trip-itinerary)
- **Live Production URL:** **[https://happy-ground-09970440f.5.azurestaticapps.net](https://happy-ground-09970440f.5.azurestaticapps.net)**

---

## ⚡ Publishing Mechanisms (Identical to Peptide Tracker)

Whenever changes are ready to publish, use any of the following methods:

### Method 1: Automated GitHub Actions CI/CD (Recommended for Git pushes)
Every commit pushed to `main` automatically triggers `.github/workflows/azure-static-web-apps.yml`:
```bash
git add .
git commit -m "feat: your new feature"
git push origin main
```
You can also trigger a manual GitHub Actions deployment anytime with:
```bash
gh workflow run "Azure Static Web Apps CI/CD"
```
Check progress with:
```bash
gh run list --limit 3
```

---

### Method 2: 1-Click macOS Double-Clickable Script (`republish.command`)
In macOS Finder, navigate to the project directory and **double-click** `republish.command`, or run from terminal:
```bash
./republish.command
```
This script:
1. Compiles the Vite frontend bundle.
2. Stages Linux-targeted dependencies in `.api-linux/`.
3. Pulls the Azure deployment secret securely via `az staticwebapp secrets list`.
4. Deploys directly to production via `@azure/static-web-apps-cli`.
5. Prompts with a success message and keeps the terminal window open until you press Enter.

---

### Method 3: NPM Command
```bash
npm run deploy
```
Defined in `package.json`:
```json
"scripts": {
  "deploy": "./scripts/deploy.sh"
}
```

---

### Method 4: Direct Shell Script
```bash
./scripts/deploy.sh
```

---

## 🐧 Why the API Staging Step is Critical (`.api-linux/`)

> **⚠️ Azure Functions Architecture Gotcha:**
> Azure Static Web Apps hosts backend APIs on **Linux x64** containers.
> When running on a Mac (especially Apple Silicon M-series), your local `api/node_modules` contains Darwin ARM64 native binaries (such as `@libsql/client` bindings).
>
> If you deploy without staging, the Azure Linux functions host will fail to load native modules, causing every `/api/*` endpoint to return a 404 or 500 error.
>
> Both `republish.command` and `scripts/deploy.sh` handle this automatically by executing:
> ```bash
> rm -rf .api-linux && mkdir -p .api-linux && cp -R api/. .api-linux/
> rm -rf .api-linux/node_modules .api-linux/test
> (cd .api-linux && npm install --os=linux --cpu=x64 --omit=dev --ignore-scripts)
> npx @azure/static-web-apps-cli deploy ./dist --api-location ./.api-linux --deployment-token "$DEPLOYMENT_TOKEN" --env production
> ```

---

## 🔑 Environment & App Settings

Configured in the Azure portal / CLI for `dallas-trip-itinerary`:

| Variable | Description |
| :--- | :--- |
| `TURSO_DATABASE_URL` | Turso Cloud SQLite database connection URL (`libsql://...`) |
| `TURSO_AUTH_TOKEN` | Turso authentication bearer token |
| `ANTHROPIC_API_KEY` | Anthropic Claude 3.5 Sonnet API key for real-time recommendation querying |
| `OPENAI_API_KEY` | OpenAI API key for AI suggestion fallback |

Secrets are stored securely in Azure Static Web Apps application settings and GitHub repository secrets (`AZURE_STATIC_WEB_APPS_API_TOKEN`). Never commit raw keys to git.
