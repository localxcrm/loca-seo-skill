@echo off
REM setup.bat - Run this after extracting the skill (Windows)
REM Renames placeholder folders to Next.js dynamic route format

echo Setting up Next.js dynamic routes...

cd /d "%~dp0assets\nextjs-template\src\app"

REM Rename service slug folder
if exist "services\_slug_" (
  ren "services\_slug_" "[slug]"
  echo √ Renamed services\_slug_ → services\[slug]
)

REM Rename location service folder first (nested)
if exist "locations\_city_\_service_" (
  ren "locations\_city_\_service_" "[service]"
  echo √ Renamed locations\_city_\_service_ → locations\_city_\[service]
)

REM Rename location city folder
if exist "locations\_city_" (
  ren "locations\_city_" "[city]"
  echo √ Renamed locations\_city_ → locations\[city]
)

echo.
echo Setup complete! Dynamic routes configured.
echo.
echo Next steps:
echo 1. cd assets\nextjs-template
echo 2. npm install
echo 3. Update site.config.js with your business info
echo 4. npm run dev

pause
