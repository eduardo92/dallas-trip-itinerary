#!/usr/bin/env bash
# ==============================================================================
# Dallas Trip Itinerary — 1-Click macOS Double-Clickable Republish Script
# ==============================================================================
# Double-click this file from Finder or run `./republish.command` from Terminal
# to automatically compile the Vite frontend, stage Linux API dependencies,
# retrieve the Azure deployment token, and publish live to Azure Static Web Apps.
# ==============================================================================

cd "$(dirname "$0")"

echo "================================================================="
echo "🤠 Dallas Trip Planner — Production Deployment"
echo "================================================================="
echo "📁 Working Directory: $(pwd)"
echo ""

# Ensure PATH includes standard Mac Homebrew & local binaries
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

echo "📦 [1/4] Compiling production build (Vite)..."
if ! npm run build; then
  echo "❌ Build failed! Aborting deployment."
  echo ""
  read -p "Press [Enter] to exit..."
  exit 1
fi

echo ""
echo "🐧 [2/4] Staging Linux x64 dependencies for Azure Functions API..."
rm -rf .api-linux
mkdir -p .api-linux
cp -R api/. .api-linux/
rm -rf .api-linux/node_modules .api-linux/test
if ! (cd .api-linux && npm install --os=linux --cpu=x64 --omit=dev --ignore-scripts); then
  echo "❌ Failed to stage API dependencies! Aborting deployment."
  echo ""
  read -p "Press [Enter] to exit..."
  exit 1
fi

echo ""
echo "🔑 [3/4] Retrieving Azure Static Web App deployment token..."
DEPLOYMENT_TOKEN=$(az staticwebapp secrets list \
  --name dallas-trip-itinerary \
  --resource-group sandbox \
  --query "properties.apiKey" \
  -o tsv 2>/dev/null)

if [ -z "$DEPLOYMENT_TOKEN" ]; then
  echo "❌ Error: Could not retrieve Azure deployment token."
  echo "   Please make sure the Azure CLI is logged in by running 'az login'."
  echo ""
  read -p "Press [Enter] to exit..."
  exit 1
fi

echo ""
echo "🚀 [4/4] Deploying ./dist and ./.api-linux to Azure Static Web Apps..."
npx --yes @azure/static-web-apps-cli deploy ./dist \
  --api-location ./.api-linux \
  --deployment-token "$DEPLOYMENT_TOKEN" \
  --env production

echo ""
echo "================================================================="
echo "✅ Deployment Successfully Complete!"
echo "🌐 Live URL: https://happy-ground-09970440f.5.azurestaticapps.net"
echo "================================================================="
echo ""
read -p "Press [Enter] to close this window..."
