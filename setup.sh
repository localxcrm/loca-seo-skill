#!/bin/bash
# setup.sh - Run this after extracting the skill
# Renames placeholder folders to Next.js dynamic route format

echo "Setting up Next.js dynamic routes..."

cd "$(dirname "$0")/assets/nextjs-template/src/app" || exit 1

# Rename service slug folder
if [ -d "services/_slug_" ]; then
  mv "services/_slug_" "services/[slug]"
  echo "✓ Renamed services/_slug_ → services/[slug]"
fi

# Rename location city folder and nested service folder
if [ -d "locations/_city_/_service_" ]; then
  mv "locations/_city_/_service_" "locations/_city_/[service]"
  echo "✓ Renamed locations/_city_/_service_ → locations/_city_/[service]"
fi

if [ -d "locations/_city_" ]; then
  mv "locations/_city_" "locations/[city]"
  echo "✓ Renamed locations/_city_ → locations/[city]"
fi

echo ""
echo "✅ Setup complete! Dynamic routes configured."
echo ""
echo "Next steps:"
echo "1. cd assets/nextjs-template"
echo "2. npm install"
echo "3. Update site.config.js with your business info"
echo "4. npm run dev"
