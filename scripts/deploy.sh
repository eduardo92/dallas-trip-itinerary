#!/usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
cd "$DIR"

echo "🤠 [1/4] Building production frontend bundle..."
npm run build

echo "🐧 [2/4] Staging Linux API dependencies for Azure Functions..."
rm -rf .api-linux
mkdir -p .api-linux
cp -R api/. .api-linux/
rm -rf .api-linux/node_modules .api-linux/test
(cd .api-linux && npm install --os=linux --cpu=x64 --omit=dev --ignore-scripts)

echo "🔑 [3/4] Retrieving Azure SWA deployment token..."
DEPLOYMENT_TOKEN=$(az staticwebapp secrets list \
  --name dallas-trip-itinerary \
  --resource-group sandbox \
  --query "properties.apiKey" \
  -o tsv)

if [ -z "$DEPLOYMENT_TOKEN" ]; then
  echo "❌ Error: Could not retrieve deployment token from Azure CLI."
  exit 1
fi

echo "🚀 [4/4] Deploying to Azure Static Web Apps (production)..."
npx -y @azure/static-web-apps-cli deploy ./dist \
  --api-location ./.api-linux \
  --deployment-token "$DEPLOYMENT_TOKEN" \
  --env production

echo "✅ Deployment complete!"
echo "🌐 Live URL: https://happy-ground-09970440f.5.azurestaticapps.net"
